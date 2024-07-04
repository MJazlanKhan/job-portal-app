import React, { useState } from 'react'
import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Alert
} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Login = () => {
    const [values, setvalues] = useState({})
    const navigate = useNavigate()
    const handleValues = (e) => {
        setvalues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {

        if (values.email && values.password) {
            try {
                const res = await axios.post('https://job-portal-app-gug2.onrender.com/v1/admin', values)
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("username", res.data.username)
                localStorage.setItem("type", res.data.type)
                localStorage.setItem("id", res.data.Id)
                localStorage.setItem("email", res.data.email)
                navigate("/admin/home")

            } catch (error) {
                console.error('Error: ', error)
            }
        } else {
            console.log("ERROR")

        }
    }




    return (
        <div>
            <div className='regWrapper'>
                <br /><br /><br /><br /><br />
                <div className='formwrapper'>
                    <>
                        <Form
                            style={{ maxWidth: 600 }}
                        >
                        
                            <h1>Admin Login</h1><br />
                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}
                            >
                                <Input name='email' onChange={handleValues} />
                            </Form.Item >

                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password name='password' onChange={handleValues} />
                            </Form.Item>

                            <br />
                            <Form.Item>
                                <Button onClick={handleSubmit} type="primary" htmlType="submit">
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                </div>
            </div>

        </div>
    )
}

export default Login
