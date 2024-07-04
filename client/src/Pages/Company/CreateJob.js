import React, { useState } from 'react'
import { Input, Button,Alert } from "antd"
import "./Style.css"
import TextArea from 'antd/es/input/TextArea'
import 'froala-editor/js/froala_editor.pkgd.min.js'; // Import Froala Editor JavaScript
import 'froala-editor/css/froala_editor.pkgd.min.css'; // Import Froala Editor CSS
import 'froala-editor/css/froala_style.min.css'; // Import Froala Editor Styles
import FroalaEditor from 'react-froala-wysiwyg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateJob = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const username = localStorage.getItem("username");
  const id = localStorage.getItem("id");
  const [JobPost, setJobPost] = useState({
    title: "",
    companyName: username,
    Location: "",
    type: "",
    Salary: "",
    summary: "",
    description: "",
    Status:"active",
    CompanyId:id
  })
  const navigate = useNavigate()
  const handleValues = (e) => {
    setJobPost({ ...JobPost, [e.target.name]: e.target.value })
  }
  const handleModelChange = (model) => {
    setJobPost({ ...JobPost, description: model })
  };

  const handleSubmit = async () => {
    console.log(JobPost)
    try {
      const response = await axios.post(`https://job-portal-app-gug2.onrender.com/api/v1/company/createjobpost`, JobPost);
      console.log(response)
      navigate("/")
      setError(false)
      setSuccess(true)

    } catch (error) {
      console.log(error)
      setSuccess(false)
      setError(true)
    }

  }
  return (
    <>
      <div className='createjobWrapper'>
        <h2>Create Job Post</h2>
        <div className='createjob'>
          <br/>
        {success && (
          <Alert message="SuccessFully Created" type="success" />)}
          {error && (
          <Alert message="Failed..!! TRY AGAIN" type="error" />)}
          <Input showCount maxLength={50} onChange={handleValues} name="title" placeholder='Enter Job Title Here !!' />
          <Input showCount maxLength={15} onChange={handleValues} name="Location" placeholder='Enter Location Here !!' />
          <Input showCount maxLength={15} onChange={handleValues} name="type" placeholder='Enter Job type Here !! ( Full Time or Part Time? )' />
          <Input showCount maxLength={10} onChange={handleValues} name="Salary" placeholder='Enter Job Salary Here !!' />
          <TextArea style={{ height: 120 }} showCount maxLength={120} onChange={handleValues} name="summary" placeholder='Enter Job Summary Here !!' />
          <FroalaEditor
            model={JobPost.description}
            onModelChange={handleModelChange}
          />

          <br />
          <div className='btns'>

            <Button type='primary' size='large' onClick={handleSubmit}>Create Job Post</Button>
          </div>
        </div>
      </div>
    </>

  )
}

export default CreateJob
