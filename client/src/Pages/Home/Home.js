import React from 'react'
import { Button } from 'antd';
import "./Home.css"
import { Link } from 'react-router-dom';
import AllPosts from '../AllPosts';


const Home = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const type = localStorage.getItem("type");
  return (
    <>
    <div className='home-main'>
    <div className='hero'>
      <div className='left'>
        <p>
        We delivered blazing fast work Solution
        </p>
        <h1>
        Find & Hire Top <br/> 3% of expert on <br/> hi’Jobs.
        </h1><br/><br/>
        { type === "company" ? (
        <Button type="primary" shape='round'size='large'><Link to="/Company/create-job">Create Job</Link></Button>):
        (<>
        <Button type="primary" shape='round'size='large'><Link to="/allPosts">All Jobs</Link></Button>
        </>)}
      </div>
      <div className='right'>
        <img src='https://hijobs.e-plugins.com/wp-content/uploads/2023/06/banner-right-image.png' alt='heroimg'/>
      </div>
    </div>
    </div>
    <AllPosts/>
    </>
  )
}

export default Home