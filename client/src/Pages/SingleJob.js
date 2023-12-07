import React, { useEffect, useState } from 'react'
import { useParams, useNavigate,Link } from "react-router-dom"
import axios from 'axios';
import { Button, Alert,Input } from "antd";
import 'froala-editor/js/froala_editor.pkgd.min.js'; // Import Froala Editor JavaScript
import 'froala-editor/css/froala_editor.pkgd.min.css'; // Import Froala Editor CSS
import 'froala-editor/css/froala_style.min.css'; // Import Froala Editor Styles
import FroalaEditor from 'react-froala-wysiwyg';
import "./Style.css"

const SingleJob = () => {
  const navigate = useNavigate()
  const { Jobid } = useParams();
  const [JobPostDetails, setJobPostDetails] = useState({});
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const type = localStorage.getItem("type");
  const postId = JobPostDetails._id
  const [sucess, setSucess] = useState(false)
  const [error, setError] = useState(false)
  const [editMode, setEditMode] = useState(false);


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/v1/posts/${Jobid}`);
        if (response.status === 200) {
          setJobPostDetails(response.data);

        } else {
          console.error('Error fetching post details:', response.status);
        }

      } catch (error) {
        console.error('Error:', error);

      }
    };

    fetchPost();
  }, [Jobid]);
  const handleApply = async () => {
    const confirmed = window.confirm('Are you Ready to Apply For this Job??');
    try {
      const response = await axios.put(`http://localhost:9000/api/v1/user/jobapply/${postId}`, {
        studentApplyName: ["username : " + username + " " + "Email : " + email]
      });
      setSucess(true)
      setError(false)
    } catch (error) {
      console.log(error)
      setError(true)
      setSucess(false)
    }
  }
  const HandleDelete =()=>{
    const confirmed = window.confirm('Are you sure you want to delete this post?');

  if (confirmed) {
    axios.delete(`http://localhost:9000/api/v1/posts/${postId}`)
      .then((response) => {
        console.log('Post deleted successfully', response);
        alert('Post deleted successfully')
      })
      .catch((error) => {
        console.error('Error deleting post', error);
        alert('Error deleting post')

      });
  }
  }
  const handleValues = async (e) => {
    setJobPostDetails({ ...JobPostDetails, [e.target.name]: e.target.value })
  }
  const EditPost = () => {
    setEditMode(true);
  };
  const handleSave = async () => {
    try {
      const updatedTitle = JobPostDetails.title;
      const updatedLocation = JobPostDetails.Location;
      const updatedSalary = JobPostDetails.Salary;
      const updatedDescription = JobPostDetails.description;
      const updatedSummary = JobPostDetails.summary;

      const response = await axios.put(`http://localhost:9000/api/v1/posts/${postId}`, {
        title: updatedTitle,
        Location: updatedLocation,
        Salary: updatedSalary,
        description: updatedDescription,
        summary: updatedSummary
      });

      if (response.status === 200) {
        console.log('Article updated successfully', response);
      } else {
        console.error('Error updating article:', response.status);
      }

      setEditMode(false);
    } catch (error) {
      console.error('Error updating article:', error);
    }
    
  };
  
 
  return (
    <div className='jobwrapper'>
      <>
      {editMode ? (
            <>
            <div className='job singlejob' >
              <Input onChange={handleValues} name="title" value={JobPostDetails.title} className='title' placeholder="Title Here" showCount maxLength={80} />
              <Input onChange={handleValues} name="Location" value={JobPostDetails.Location} className='title' placeholder="Location Here" showCount maxLength={250} />
              <Input onChange={handleValues} name="type" value={JobPostDetails.type} className='title' placeholder="Type Here" showCount maxLength={250} />
              <Input onChange={handleValues} name="Salary" value={JobPostDetails.Salary} className='title' placeholder="Salary Here" showCount maxLength={250} />
              <Input onChange={handleValues} name="summary" value={JobPostDetails.summary} className='title' placeholder="summary Here" showCount maxLength={250} />
              <FroalaEditor
                model={JobPostDetails.description}
                onModelChange={(newDescription) => {
                  setJobPostDetails({ ...JobPostDetails, description: newDescription });
                }}
              />
              <Button type="primary" onClick={handleSave}>Save</Button>
              </div>
            </>
          ) :(
        
        <div className='job singlejob' >
          {sucess && (
            <Alert message="Successfully Applied" type="success" />
          )}
          {error && (
            <Alert message="You Already Applied For this Job" type="error" />
          )}
          <h2 name="title">{JobPostDetails.title}</h2>
          <div className='flex'>
            
            <h3 name="companyName"><Link to={`/visit/Company/${JobPostDetails.companyName}`}>{JobPostDetails.companyName}</Link></h3>
            <h3 name="Location">{JobPostDetails.Location}</h3>
          </div>
          <div className='flex'>
            <h3 name="type">{JobPostDetails.type}</h3>
            <h3 name="Salary">{JobPostDetails.Salary}</h3>
          </div>

          <label className='label'> Description: </label>
          <h3 name="description" className='content' dangerouslySetInnerHTML={{ __html: JobPostDetails.description }}></h3>
          {username === JobPostDetails.companyName && (
            <>
            <h2>Student Who Already Applied this Job</h2>
          <ul>
          {JobPostDetails.studentApplyName?.map(name => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        </>)}
          {type === "student" && (
            <Button onClick={handleApply} type='primary'>Apply Now</Button>)}
          {/* <h3 >{applicantString}</h3> */}
          { }
          {username === JobPostDetails.companyName && (
<>
            <Button onClick={EditPost} type='primary'>Edit Post</Button>
            <Button onClick={HandleDelete} type='primary'>Delete Post</Button></>
            )}
        </div>
        )}
      </>
    </div>
  )
}

export default SingleJob