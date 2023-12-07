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
  Result,
  Alert
} from 'antd'
import axios from "axios"
import { Link } from "react-router-dom"


const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorName, setErrorName] = useState("");
  const [user, setUser] = useState()
  const [errorMessage, seterrorMessage] = useState("")
  const [Company, setCompany] = useState({
    email: "",
    password: "",
    confirm: "",
    CompanyName: "",
    CompanyAddress: "",
    phone: "",
    intro: "",
    Status:"active"
  })
  const [student, setStudent] = useState({
    email: "",
    password: "",
    confirm: "",
    nickname: "",
    residence: "",
    phone: "",
    Status:"active"
  })
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

    if (student.email && student.password && student.confirm && student.nickname && student.residence && student.phone) {
      console.log(student)
      try {
        const res = await axios.post('http://localhost:9000/api/v1/user/studentSignup', student)
        setSuccess(true)
      setError(false)

      } catch (error) {
        console.error('Error: ', error);
        setError(true)
        setSuccess(false)
        seterrorMessage(error.response.data.message)
      }
    } else {
      console.log("ERROR")
      seterrorMessage("ERROR Fill All Fields")
      setError(true)
      setSuccess(false)

    }
  }
  const handleCompanySubmit = async () => {

    if (Company.email , Company.password, Company.confirm, Company.CompanyName, Company.CompanyAddress, Company.phone ,Company.intro) {
      console.log(Company)
      try {
        const res = await axios.post('http://localhost:9000/api/v1/user/companySignup', Company)
        setSuccess(true)
      setError(false)

      } catch (error) {
        console.error('Error: ', error);
        setError(true)
        setSuccess(false)
        seterrorMessage(error.response.data.message)
      }
    } else {
      
      setError(true)
      setSuccess(false)
      seterrorMessage("Fil All Details")

    }
  }
  return (
    <div>
      <div className='regWrapper'>

        <br /><br /><br /><br /><br />
        <div className='formwrapper'>
          <div className='btns'>
            <Button onClick={handleCompany} size='large' type='primary'>Register Company Account</Button>
            <Button onClick={handleUser} size='large' type='primary'>Register Personal Account</Button>
          </div>
          {user === 'Personal' && (

            <>
              {success && (
                <div className='alert'>
                  <Alert message="Successfully Created" type="success" /><Link to="/signin">Signin Now</Link>
                  <br />
                </div>

              )}
              {error && (
                <div className='alert-error'>
                  <Alert  message={errorMessage} type="error" />
                  <br />
                </div>

              )}
              <form
                onSubmit={(e) => { e.preventDefault() }}
                style={{ maxWidth: 600 }}
              >
                <h1>Register Your Personal Account</h1><br />
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

                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The new password that you entered do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password name='confirm' onChange={handlePersonalValues} />
                </Form.Item>

                <Form.Item
                  name="nickname"
                  label="Nickname"
                  tooltip="What do you want others to call you?"
                  rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                >
                  <Input name='nickname' onChange={handlePersonalValues} />
                </Form.Item >

                <Form.Item
                  name="residence"
                  label="Habitual Residence"
                  rules={[
                    { type: 'array', required: true, message: 'Please select your habitual residence!' },
                  ]}
                >
                  <Input name='residence' onChange={handlePersonalValues} />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                  <Input name="phone" onChange={handlePersonalValues} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item>
                  <Button onClick={handlePersonalSubmit} type="primary" htmlType="submit">
                    Register
                  </Button>
                </Form.Item>
              </form>
            </>
          )}
          {user === 'Company' && (

            <>
              {success && ( // Place it here
                <div className='alert'>
                  <Alert message="Success Text" type="success" /><Link to="/signin">Signin Now</Link>
                  <br />
                </div>

              )}
               {error && (
                <div className='alert-error'>
                  <Alert  message={errorMessage} type="error" />
                  <br />
                </div>

              )}
              <Form
                style={{ maxWidth: 600 }}
              >
                <h1>Register Your Company Account</h1><br />
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
                  <Input name="email" onChange={handleCompanyValues} />
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
                  <Input.Password name="password" onChange={handleCompanyValues} />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The new password that you entered do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password name="confirm" onChange={handleCompanyValues} />
                </Form.Item>

                <Form.Item
                  name="CompanyName"
                  label="Company Name"
                  tooltip="What do you want others to call you?"
                  rules={[{ required: true, message: 'Please input your Company Name!', whitespace: true }]}
                >
                  <Input name="CompanyName" onChange={handleCompanyValues} />
                </Form.Item>

                <Form.Item
                  name="CompanyAddress"
                  label="Company Address"

                >
                  <Input name="CompanyAddress" onChange={handleCompanyValues} />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                  <Input name="phone" onChange={handleCompanyValues} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                  name="intro"
                  label="Intro"
                  rules={[{ required: true, message: 'Please input Intro' }]}
                >
                  <Input.TextArea name="intro" onChange={handleCompanyValues} showCount maxLength={100} />
                </Form.Item>

                <Form.Item>
                  <Button onClick={handleCompanySubmit} type="primary" htmlType="submit" >
                    Register
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

export default Register