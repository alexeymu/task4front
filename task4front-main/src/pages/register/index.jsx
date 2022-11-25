import React from 'react'
import { Button, Form, Input } from 'antd'
import { registration } from '../../services/auth'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth'


export const Register = (props) => {
    const navigate = useNavigate()
    const { signIn } = useAuth()

    const onFinish = (values) => {
        registration(values).then(function(user) {
            signIn(user, function() {
                navigate('/table')
            })
        }).catch(function(e) {
            alert(e);
        })
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }
    return (
        <Form
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
        >
            <Form.Item
                label='Username'
                name='username'
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    }]
                }>
                <Input />
            </Form.Item>
            <Form.Item
                label='Email'
                name='email'
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item
                label='Password'
                name='password'
                rules={
                    [{
                        required: true,
                        message: 'Please input your password!',
                    }]
                }>
                <Input.Password />
            </Form.Item>
            <Form.Item
                name='confirm'
                label='Confirm Password'
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'))
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button
                    type='primary'
                    htmlType='submit'
                >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )

}

export default Register
