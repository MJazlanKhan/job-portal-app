import React, { useState, useEffect } from 'react'
import "./Style.css"
import { Layout, Menu, Table, Spin, Flex, Modal, Dropdown, Button  } from 'antd';
import axios from 'axios';
import {
  UserOutlined,
  DashboardOutlined,
  GlobalOutlined,
  BookOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const AdminHome = () => {
  const [Click, setClick] = useState(null)
  const [JobPosts, setJobPosts] = useState([]);
  const [companies, setCompanies] = useState([])
  const [users, setusers] = useState([])
  const navigate = useNavigate()
  const type = localStorage.getItem("type");

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get('https://job-portal-app-gug2.onrender.com/api/v1/allUsers');
        if (response.status === 200) {
          const data = response.data;
          setusers(data);
        } else {
          console.error('Error fetching blog posts:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBlogPosts();
  }, []);
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get('https://job-portal-app-gug2.onrender.com/api/v1/allCompanies');
        if (response.status === 200) {
          const data = response.data;
          setCompanies(data);
        } else {
          console.error('Error fetching blog posts:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBlogPosts();
  }, []);
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get('https://job-portal-app-gug2.onrender.com/api/v1/adminallPost');
        if (response.status === 200) {
          const data = response.data;
          setJobPosts(data);
        } else {
          console.error('Error fetching blog posts:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBlogPosts();
  }, []);
  const JobStatusMenu = (record) => (
    <Menu onClick={({ key }) => handleJobStatusChange(record, key)}>
      <Menu.Item key="active">Active</Menu.Item>
      <Menu.Item key="disable">Disable</Menu.Item>
    </Menu>
  );
  const handleJobStatusChange = async (record, status) => {
    try {
      const response = await axios.put(`https://job-portal-app-gug2.onrender.com/api/v1/updateStatus/${record._id}`, {
        status: status === 'active' ? 'active' : 'disable',
      });
  
      if (response.status === 200) {
        // Update only the clicked post in the local state
        const updatedData = JobPosts.map((item) =>
          item._id === record._id ? { ...item, Status: status === 'active' ? 'active' : 'disable' } : item
        );
        setJobPosts(updatedData);
      } else {
        console.error('Error updating status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const UserStatusMenu = (record) => (
    <Menu onClick={({ key }) => handleUserStatusChange(record, key)}>
      <Menu.Item key="active">Active</Menu.Item>
      <Menu.Item key="disable">Disable</Menu.Item>
    </Menu>
  );
  const handleUserStatusChange = async (record, status) => {
    try {
      const response = await axios.put(`https://job-portal-app-gug2.onrender.com/api/v1/UserupdateStatus/${record._id}`, {
        status: status === 'active' ? 'active' : 'disable',
      });
  
      if (response.status === 200) {
        // Update only the clicked post in the local state
        const updatedData = users.map((item) =>
          item._id === record._id ? { ...item, Status: status === 'active' ? 'active' : 'disable' } : item
        );
        setusers(updatedData);
      } else {
        console.error('Error updating status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const CompanyStatusMenu = (record) => (
    <Menu onClick={({ key }) => handleCompanyStatusChange(record, key)}>
      <Menu.Item key="active">Active</Menu.Item>
      <Menu.Item key="disable">Disable</Menu.Item>
    </Menu>
  );
  const handleCompanyStatusChange = async (record, status) => {
    try {
      const response = await axios.put(`https://job-portal-app-gug2.onrender.com/api/v1/CompanyupdateStatus/${record._id}`, {
        status: status === 'active' ? 'active' : 'disable',
      });
  
      if (response.status === 200) {
        // Update only the clicked post in the local state
        const updatedData = companies.map((item) =>
          item._id === record._id ? { ...item, Status: status === 'active' ? 'active' : 'disable' } : item
        );
        setCompanies(updatedData);
      } else {
        console.error('Error updating status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleLogout = () => {
    const token = localStorage.removeItem("token");
    const username = localStorage.removeItem("username");
    const type = localStorage.removeItem("type");
    const id = localStorage.removeItem("id")
    const email = localStorage.removeItem("email")
    alert("logout Sucessfull")
    navigate("/")
  } 
    

  const columns = [
    {
      title: 'nickname',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'residence',
      key: 'residence',
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      render: (text, record) => (
        <Dropdown overlay={UserStatusMenu(record)} placement="bottomLeft" arrow>
          <Button>{text}</Button>
        </Dropdown>
      ),
    },
  ];
  const PostColumns = [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Location',
      dataIndex: 'Location',
      key: 'Location',
    },
    {
      title: 'type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'companyName',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      render: (text, record) => (
        <Dropdown overlay={JobStatusMenu(record)} placement="bottomLeft" arrow>
          <Button>{text}</Button>
        </Dropdown>
      ),
    },
  ];
  const CompanyColumns = [
    {
      title: 'CompanyName',
      dataIndex: 'CompanyName',
      key: 'CompanyName',
    },
    {
      title: 'CompanyAddress',
      dataIndex: 'CompanyAddress',
      key: 'CompanyAddress',
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      render: (text, record) => (
        <Dropdown overlay={CompanyStatusMenu(record)} placement="bottomLeft" arrow>
          <Button>{text}</Button>
        </Dropdown>
      ),

    },
  ];
  const handleUser = () => {
    setClick("user")
  }
  const handleCompany = () => {
    setClick("company")
  }

  const handlePosts = () => {
    setClick("posts")
  }
  return (
    <>
    {type==="admin" ? (
      <>
      {console.log(users)}
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={250} theme="dark" breakpoint="lg" collapsedWidth="0">
          <h1>Welcome Admin</h1>
          <Menu className='menu' mode="vertical" theme="dark" defaultSelectedKeys={['1']}>

            <Menu.Item key="1" onClick={() => { setClick(null) }} icon={<DashboardOutlined />} > Dashboard </Menu.Item>
            <Menu.Item key="2" onClick={handleUser} icon={<UserOutlined />} > All Users</Menu.Item>
            <Menu.Item key="3" onClick={handleCompany} icon={<GlobalOutlined />} > All Companies </Menu.Item>
            <Menu.Item key="4" onClick={handlePosts} icon={<BookOutlined />} > All Jobs </Menu.Item>
            <Menu.Item key="4" onClick={handleLogout} icon={<BookOutlined />} > Logout </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '16px' }}>

            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {Click === null && (
                <>
                  <h1>Welcome to the Admin Panel</h1>
                  <p>This is a beautiful admin panel layout using Ant Design.</p>
                </>)}
              {Click === "user" && (
                <>
                  {users.length === 0 && (<Flex align="center" gap="middle">

                    <Spin size="large" />
                  </Flex>)}
                  <Table
                    columns={columns}
                    dataSource={users}
                    pagination={false} // Disable pagination for simplicity
                    style={{ marginTop: '20px' }}
                  />
                </>
              )
              }
              {Click === "company" && (
                <>
                {companies.length === 0 && (
                  <Flex align="center" gap="middle">

                    <Spin size="large" />
                  </Flex>)}
                <Table
                  columns={CompanyColumns}
                  dataSource={companies}
                  pagination={false} // Disable pagination for simplicity
                  style={{ marginTop: '20px' }}
                />
                </>
                )}
              {Click === "posts" && (
                <>
                  {JobPosts.length === 0 && (
                    <Flex align="center" gap="middle">

                      <Spin size="large" />
                    </Flex>)}
                  <Table
                    columns={PostColumns}
                    dataSource={JobPosts}
                    pagination={false} // Disable pagination for simplicity
                    style={{ marginTop: '20px' }}
                  />
                </>

              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
    ):(
      <div>
        <h1>Admin Authentication Failed</h1>
      </div>
    )}
    </>
    
  )
}

export default AdminHome
