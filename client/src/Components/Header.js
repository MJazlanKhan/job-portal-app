import React,{useState} from 'react'
import { Row, Col, Button} from 'antd';
import "./Components.css"
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space, Menu } from 'antd';

import {Link, useNavigate} from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const Id = localStorage.getItem("id");
    const type = localStorage.getItem("type");
    const handleLogout = () => {
      const token = localStorage.removeItem("token");
      const username = localStorage.removeItem("username");
      const type = localStorage.removeItem("type");
      const id = localStorage.removeItem("id")
      const email = localStorage.removeItem("email")
      alert("logout Sucessfull")
      navigate("/")
    } 
    const companyItems = (
      <Menu>
        <Menu.Item key="1">
          <Link to={`/Company/${Id}`}>My Profile</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link onClick={handleLogout}>Logout</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={`/Company/posts/${username}`}>My Posted Jobs</Link>
        </Menu.Item>
      </Menu>
    );
  
    const personalItems = (
      <Menu>
        <Menu.Item key="1">
        <Link to={`/my-profile/${Id}`}>My Profile</Link>
          
        </Menu.Item>
        <Menu.Item key="2">
          <Link onClick={handleLogout} to="/logout">Logout</Link>
        </Menu.Item>
      </Menu>
    );
    
  return (
    <div>
        <div className='HeaderWrapper'>
        <div className='nav-wrapper'>
        <Row className='nav'>
        <Col className="last" span={6} xs={{ order: 1 }} sm={{ order: 2 }} md={{ order: 3 }} lg={{ order: 4 }}>
              <Link to="/">Home</Link>
              {type === "admin" && (
              <Button type="primary" onClick={handleLogout}>Logout</Button>)}
              {token === null && (
                <>
                <Button type="primary" shape="round" size="large">
                  <Link to="/signin">Signin</Link>
                  
                </Button>
                <Button type="primary" shape="round" size="large">
                  <Link to="/Signup">Signup</Link>
                  
                </Button>
                </>
              )}
              {type === "company" &&(
                <Dropdown overlay={companyItems}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {username}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
              )}{type === "student" &&(
                <Dropdown overlay={personalItems}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      {username}
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              )}
            </Col>
      
      <Col span={6} xs={{ order: 4 }} sm={{ order: 3 }} md={{ order: 1 }} lg={{ order: 2 }}>
        <Link to="/">
      <img className='logo' src='https://hijobs.e-plugins.com/wp-content/uploads/2023/06/logo.png'/></Link>
      </Col>
    </Row>
    </div>
        </div>
    </div>
  )
}

export default Header