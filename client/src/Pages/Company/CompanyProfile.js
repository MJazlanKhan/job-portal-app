import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input, Button } from "antd"
import axios from 'axios';
import "./Style.css"

const CompanyProfile = () => {
    const [editMode, setEditMode] = useState(false);
    const { userId } = useParams();
    const [profile, setProfile] = useState({}); // Change to an object
    const navigate = useNavigate()
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/v1/company/${userId}`);
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

    const handleValues = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value })
    }

    const handleSave = async () => {
        try {
            const updatedCompanyName = profile.CompanyName;
            const updatedphone = profile.phone;
            const updatedCompanyAddress = profile.CompanyAddress;
            const updatedintro = profile.intro;

            const response = await axios.put(`http://localhost:9000/api/v1/Company/${userId}`, {
                CompanyName: updatedCompanyName,
                CompanyAddress: updatedCompanyAddress,
                phone: updatedphone,
                intro: updatedintro
            });
            localStorage.setItem("username", response.data.CompanyName)
            console.log('Response:', response);
            navigate("/")
            if (response.status === 200) {
                console.log('Profile updated successfully');
            } else {
                console.error('Error updating profile:', response.status);
            }

            setEditMode(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const EditPost = () => {
        setEditMode(true);
    };

    return (
        <div className='profileWrapper'>
        <div className='profile'>
            <h1>User Profile</h1>
                        <br/>

            <div className='editaera'>
                {/* Display the user's profile data here */}
                {editMode ? (
                    <>
                        <Input onChange={handleValues} name="CompanyName" value={profile.CompanyName} className='title' placeholder="Company Name Here" showCount maxLength={80} /> 
                        <Input onChange={handleValues} name="CompanyAddress" value={profile.CompanyAddress} className='title' placeholder="Company Address Here" showCount maxLength={250} />
                        <Input onChange={handleValues} name="phone" value={profile.phone} />

                        <Input.TextArea name="intro" onChange={handleValues} value={profile.intro} showCount maxLength={100} /><br/>

                        <Button type="primary" onClick={handleSave}>Save</Button>
                    </>
                ) : (
                    <>
                    <div className='btns'>
                        <Button type='primary' onClick={EditPost}>Edit Profile</Button>
                        </div>
                        <div>
                        <p><label>Name:</label> {profile.CompanyName}</p>
                       <p><label>Email:</label> {profile.email}</p>
                       <p> <label>Address:</label>residence: {profile.residence}</p>
                        <p><label>Phone Number:</label>phone: {profile.phone}</p>
                       <p><label>Intro Of Company:</label> Intro: {profile.intro}</p>
                        </div>
                    </>
                )}
                {/* Add more profile information as needed */}
            </div>
        </div>
        </div>
    );
};

export default CompanyProfile;
