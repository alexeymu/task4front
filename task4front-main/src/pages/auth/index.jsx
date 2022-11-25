import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { auth } from '../../services/auth'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth'


export const Auth = () => {
    const navigate = useNavigate()
    const { signIn } = useAuth()

    const onFinish = (values) => {
        auth(values).then(function(user) {
            signIn(user, function() {
                navigate('/table')
            })
        }).catch(function(e) {
            alert(e);
        })
    }

    return (
        <Form
            name='normal_login'
            className='login-form'
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name='email'
                rules={
                    [{
                        required: true,
                        message: 'Please input your Email!',
                    }]
                }>
                <Input prefix={< UserOutlined className='site-form-item-icon' />} placeholder='Email' />
            </Form.Item>
            <Form.Item
                name='password'
                rules={
                    [{
                        required: true,
                        message: 'Please input your Password!',
                    }]
                }
            >
                <Input
                    prefix={< LockOutlined className='site-form-item-icon' />}
                    type='password'
                    placeholder='Password'
                />
            </Form.Item>
            <Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    className='login-form-button'
                >
                    Log in
                </Button>
                Or <a href='/register'> register now! </a>
            </Form.Item>
        </Form>
    )
}
export default Auth
