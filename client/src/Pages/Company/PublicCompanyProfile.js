import React, { useState, useEffect } from 'react';
import { useNavigate, useParams , Link} from 'react-router-dom';
import { Input, Button } from "antd"
import sanitizeHtml from 'sanitize-html';
import axios from 'axios';
import "./Style.css"
import AllPostsSingleCompany from "./AllPostsSingleCompany.js"

const PublicCompanyProfile = () => {
    const [JobPosts, setJobPosts] = useState([]);

    const { userId } = useParams();
    const [profile, setProfile] = useState({});
    const username = profile.CompanyName
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/v1/public/company/${userId}`);
                if (response.status === 200) {
                    const data = response.data;
                    setProfile(data); // Update the profile state
                } else {
                    console.error('Error fetching user profile:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchProfile();
    }, [userId]); // Include userId as a dependency
    useEffect(() => {
        const fetchBlogPosts = async () => {
          try {
            const response = await axios.get(`http://localhost:9000/api/v1/display/company/posts/${userId}`);
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
        <div className='profileWrapper'>
        <div className='profile'>
            <h1>User Profile</h1>
                        <br/>

            <div className='editaera'>
                    <>
                    <div className='btns'>
                        </div>
                        <div>
                        <p><label>Name:</label> {profile.CompanyName}</p>
                       <p><label>Email:</label> {profile.email}</p>
                       <p> <label>Address:</label>residence: {profile.residence}</p>
                        <p><label>Phone Number:</label>phone: {profile.phone}</p>
                       <p><label>Intro Of Company:</label> Intro: {profile.intro}</p>
                        </div>
                    </>
            </div>
        <div className="Allposts">
        <div className='container'>
    {console.log(JobPosts)}
    <h1>My Posted Jobs</h1>
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
        </div>
        </div>
        </div>
    );
};

export default PublicCompanyProfile;
