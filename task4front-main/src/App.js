import './App.css'
import 'antd/dist/antd.css'
import Register from './pages/register'
import Auth from './pages/auth'
import ClientTable from './pages/table'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import React from 'react'
import { AuthProvider } from './contexts/auth'
import { Button, Space } from 'antd';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='register' element={<Register />} />
                    <Route path='auth' element={<Auth />} />
                    <Route path='table' element={< ClientTable />} />
                </Route>
            </Routes>
        </AuthProvider>
    )
}

function Layout() {
    return (
        <div>
            <nav >
                

                <Space wrap>
                        <Button type="Home"  href='/'> Home </Button>
                        <Button type="Register" href='/register'> Register </Button>
                        <Button type="Auth"  href='/auth'> Auth </Button>
                        <Button type="Table"  href='/table'> Table </Button>
                </Space>
                       
                
            </nav>
            <hr />
            <Outlet />
        </div>
    )
}

export default App
