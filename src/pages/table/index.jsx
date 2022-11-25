import { Space, Divider, Table, Tag, Popconfirm } from 'antd'
import React, { useState, useEffect } from 'react'

import { useAuth } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom'
import { getUsersList, deleteUser, blockUser, unblockUser } from '../../services/users'



const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    }),
}


const ClientsTable = () => {
    const { isAuthorized, user } = useAuth()
    const navigate = useNavigate()
    const [users, setUsers] = useState([])

    const columns = [
        {
            title: '',
            dataIndex: '',
            key: '',
        },
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (text) => < a> {text} </a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Date create',
            dataIndex: 'dateCreate',
            key: 'dateCreate',
        },
        {
            title: 'Last entry time',
            dataIndex: 'lastLogin',
            key: 'lastLogin',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (_, { status }) => {
                let color
                let statusText
                if (status === 0) {
                    color = 'red'
                    statusText = 'blocked'
                } else {
                    color = 'green'
                    statusText = 'Unblocked'
    
                }
                return (
                    <Tag
                        color={color}
                        key={status}>
                        {statusText.toUpperCase()}
                    </Tag>
                )
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size='middle'>
                    {record.status === 1 && <Popconfirm title="Sure to block?" onConfirm={() => handleBlock(record._id)}><a>Block</a></Popconfirm>}
                    {record.status === 0 && <Popconfirm title="Sure to unblock?" onConfirm={() => handleUnblock(record._id)}><a>Unblock</a></Popconfirm>}
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
                     <a>Delete</a>
                </Popconfirm>
                </Space>
            ),
        },
    ]

    
    const loadUserList = () => {
        getUsersList().then(function(usersList) {
            setUsers(usersList)
        })
    }

    const handleDelete = (id) => {
        deleteUser(id).then(() => {
            loadUserList()
        })
    }

    const handleUnblock=(id)=>{
        unblockUser(id).then(()=>{
            loadUserList()
        })
    }

    const handleBlock=(id)=>{
        blockUser(id).then(()=>{
            loadUserList()
        })
    }


    useEffect(() => {
        if (!isAuthorized) {
            navigate('/auth')
        }

        loadUserList()
    }, [isAuthorized, user])

    if (!isAuthorized) {
        return null
    }

    return (
        <div>
            <Divider />
            <Table
                rowSelection={
                    {
                        type: 'checkbox',
                        ...rowSelection,
                    }
                }
                columns={columns}
                dataSource={users}
            />
        </div>
    )
}


export default ClientsTable
