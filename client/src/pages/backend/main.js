import React from 'react';
import Header from '../../components/backend/header';
import SideBar from '../../components/backend/sidebar';
import {Route, Routes, Navigate, useLocation} from "react-router-dom";
import Dashboard from './dashboard';
import Projects from './projects';
import CommonInfo from './common_info';
import CmsPages from './cms_pages';
import NotFound from './not_found';
import Pages from './pages';
import UpdateProfile from './updateProfile';
import Profile from './profile';
import { useAuth } from "../../contexts/AuthContext";

const Main = () => {
    const {currentUser} = useAuth();
    const location = useLocation();
    if (!currentUser) {
        return <Navigate to="login" state={{ from: location }} replace />;
      }

    return(
        <>
            <div className="layout">
                    <SideBar/>
                    <Header/>
                    <div className='main'>
                        <Routes>
                            <Route index element={<Dashboard/>} />
                            <Route exact path="/projects" element={<Projects/>}/>
                            <Route exact path="/common_info" element={<CommonInfo/>}/>
                            <Route exact path="/cms" element={<CmsPages/>}/>
                            <Route exact path="/pages" element={<Pages/>}/>
                            <Route exact path="/updateProfile" element={<UpdateProfile/>}/>
                            <Route exact path="/profile" element={<Profile/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </div>
                
            </div>
        </>
    );
}
export default Main;