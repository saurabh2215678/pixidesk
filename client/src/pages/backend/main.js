import React from 'react';
import Header from '../../components/backend/header';
import SideBar from '../../components/backend/sidebar';
import {Route, Routes, Navigate} from "react-router-dom";
import Dashboard from './dashboard';
import Projects from './projects';
import CommonInfo from './common_info';
import CmsPages from './cms_pages';
import NotFound from './not_found';
import Pages from './pages';
import UpdateProfile from './updateProfile';
import { useAuth } from "../../contexts/AuthContext";

const Main = () => {
    const {currentUser} = useAuth();
    if (!currentUser) {
        return <Navigate to="login" replace />;
      }

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    return(
        <>
            <div className="layout">
                    <SideBar/>
                    <Header/>
                    <div className='main'>
                        <div className='content-box'>
                            <Routes>
                                <Route index element={<Dashboard/>} />
                                <Route exact path="/projects" element={<Projects/>}/>
                                <Route exact path="/common_info" element={<CommonInfo/>}/>
                                <Route exact path="/cms" element={<CmsPages/>}/>
                                <Route exact path="/pages" element={<Pages/>}/>
                                <Route exact path="/updateProfile" element={<UpdateProfile/>}/>
                                <Route path="*" element={<NotFound/>}/>
                            </Routes>
                        </div>
                    </div>
                
            </div>
        </>
    );
}
export default Main;