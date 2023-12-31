import React, { useState, useEffect } from 'react'
import "./Company/Style.css"
import sanitizeHtml from 'sanitize-html';
import { Button,Spin, Flex, } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllPosts = () => {
  const [JobPosts, setJobPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get('https://job-portal-app-gug2.onrender.com/api/v1/posts');
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
  function truncate(text, limit) {
    const truncated = text.substring(0, limit);
    return text.length > limit ? truncated + '...' : truncated;
  }
  return (

    <div className='container'>
    {console.log(JobPosts)}
    <h1>All Jobs</h1>
    {JobPosts.length === 0 && (<Flex align="center" justify='center' gap="middle">

<Spin size="large" />
</Flex>)}
    <div className='jobWrapper'>
      <div className='job'>
        
        {JobPosts.map(JobPost => {

          const description = JobPost.description;

          let text = sanitizeHtml(description, {
            allowedTags: []
          });

          // Truncate text
          text = truncate(text, 150);

          return (
            <>
            <div className='alljobswrapper'>
            <div className='numjob'>
            <div key={JobPost._id}>
              <h2 name="title">{JobPost.title}</h2>
              <div className='flex'>
                <h3 name="companyName">{JobPost.companyName}</h3>
                <h3 name="Location">{JobPost.Location}</h3>
              </div>
              <div className='flex'>
                <h3 name="type">{JobPost.type}</h3>
                <h3 name="Salary">{JobPost.Salary}</h3>
              </div><br />
              <label>Short Description: </label><br /><br />
              <h3 className='summary'>{JobPost.summary}</h3>
              {text}
            </div>
            <br/>
              <Button className='btn' size='large' type='primary'> <Link to={`/post/${JobPost._id}`}>CLick to Read More</Link></Button>
              </div>
              </div>
          </>
          );

        })}
      </div>

    </div>
  </div>
  )
}

export default AllPosts
