import React, { useState } from 'react'
import "./Style.css"
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
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [Company, setCompany] = useState({})
  const [student, setStudent] = useState({})
  const [errorMessage, seterrorMessage] = useState("")
  const [user, setUser] = useState()
  const handleCompany = () => {
    setUser("Company")
  }
  const handleUser = () => {
    setUser("Personal")
  }

  const handleCompanyValues = (e) => {
    setCompany({ ...Company, [e.target.name]: e.target.value })
  }
  const handlePersonalValues = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value })
  }
  const handlePersonalSubmit = async () => {

    if (student.email && student.password) {
      console.log(student)
      try {
        const res = await axios.post('http://localhost:9000/api/v1/user/userLogin', student)
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("username", res.data.username)
        localStorage.setItem("type", res.data.type)
        localStorage.setItem("id", res.data.Id)
        localStorage.setItem("email", res.data.email)

        setSuccess(true)
        setError(false)
        navigate("/")

      } catch (error) {
        console.error('Error: ', error.response.data.message);
        seterrorMessage(error.response.data.message)
        setError(true)
        setSuccess(false)
      }
    } else {
      console.log("ERROR")
      setError(true)
      setSuccess(false)

    }
  }
  const handleCompanySubmit = async () => {

    if (Company.email, Company.password) {
      console.log(student)
      try {
        const res = await axios.post('http://localhost:9000/api/v1/user/companyLogin', Company)
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("username", res.data.username)
        localStorage.setItem("type", res.data.type)
        localStorage.setItem("id", res.data.Id)
        setSuccess(true)
        setError(false)
        navigate("/")

      } catch (error) {
        console.error('Error: ', error);
        seterrorMessage(error.response.data.message)
        setError(true)
        setSuccess(false)
      }
    } else {
      console.log("ERROR")
      seterrorMessage("Fill All Details")
      setError(true)
      setSuccess(false)

    }
  }



  return (
    <div>
      <div className='regWrapper'>

        <br /><br /><br /><br /><br />
        <div className='formwrapper'>
          <div className='btns'>
            <Button onClick={handleCompany} size='large' type='primary'>Login Company Account</Button>
            <Button onClick={handleUser} size='large' type='primary'>Login Personal Account</Button>
          </div>
          {user === 'Personal' && (
            <>
              <Form
                style={{ maxWidth: 600 }}
              >
                {success && ( // Place it here
                  <div className='alert'>
                    <Alert message="Success Text" type="success" /><Link>Signin Now</Link>
                    <br />
                  </div>

                )}
                {error && ( // Place it here
                  <div className='alert-error'>
                    <Alert message={errorMessage} type="error" />
                    <br />
                  </div>

                )}
                <h1>Login Your Personal Account</h1><br />
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
                  <Input name='email' onChange={handlePersonalValues} />
                </Form.Item>

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
                  <Input.Password name='password' onChange={handlePersonalValues} />
                </Form.Item>

                <Form.Item>
                  <h3>Don't Have an Account? <Link to="/Signup">Create One!</Link> </h3>

                  <br />
                  <Button onClick={handlePersonalSubmit} type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}
          {user === 'Company' && (
            <>
              <Form
                style={{ maxWidth: 600 }}
              >
                {success && ( // Place it here
                  <div className='alert'>
                    <Alert message="Success Text" type="success" /><Link>Signin Now</Link>
                    <br />
                  </div>

                )}
                {error && ( // Place it here
                  <div className='alert-error'>
                    <Alert message={errorMessage} type="error" />
                    <br />
                  </div>

                )}
                <h1>Login Your Company Account</h1><br />
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
                  <Input name='email' onChange={handleCompanyValues} />
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
                  <Input.Password name='password' onChange={handleCompanyValues} />
                </Form.Item>
                <h3>Don't Have an Account? <Link to="/Signup">Create One!</Link> </h3>

                <br />
                <Form.Item>
                  <Button onClick={handleCompanySubmit} type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}
        </div>
      </div>

    </div>
  )
}

export default Login