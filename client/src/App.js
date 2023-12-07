import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './Components/Header';
import Register from './Pages/Login-Register/Register';
import Home from './Pages/Home/Home';
import Login from './Pages/Login-Register/Login';
import UserProfile from './Pages/UserProfile/UserProfile';
import CompanyProfile from './Pages/Company/CompanyProfile';
import CreateJob from './Pages/Company/CreateJob';
import AllPosts from './Pages/AllPosts';
import AllPostsSingleCompany from "./Pages/Company/AllPostsSingleCompany";
import SingleJob from './Pages/SingleJob';
import PublicCompanyProfile from './Pages/Company/PublicCompanyProfile';
import AdminHome from "./Pages/Admin/AdminHome";
import AdminLogin from "./Pages/Admin/AdminLogin";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the current route is '/admin/home'
  const isAdminHome = location.pathname === '/admin/home';

  return (
    <>
      {!isAdminHome && <Header />}
      <Routes>
        <Route path='/admin/home' element={<AdminHome />} />
        <Route path='/' element={<Home />} />
        <Route path='/Signup' element={<Register />} />
        <Route path='/Signin' element={<Login />} />
        <Route path='/my-profile/:userId' element={<UserProfile />} />
        <Route path='/Company/:userId' element={<CompanyProfile />} />
        <Route path='/visit/Company/:userId' element={<PublicCompanyProfile />} />
        <Route path='/Company/create-job' element={<CreateJob />} />
        <Route path='/Company/posts/:userId' element={<AllPostsSingleCompany />} />
        <Route path='/allPosts' element={<AllPosts />} />
        <Route path='/post/:Jobid' element={<SingleJob />} />
        <Route path='/admin' element={<AdminLogin />} />
      </Routes>
    </>
  );
}

export default App;
