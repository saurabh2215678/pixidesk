import React from 'react';
import Header from '../../components/backend/header';
import SideBar from '../../components/backend/sidebar';
import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from "react-router-dom";
import Dashboard from './dashboard';
import Projects from './projects';
import CommonInfo from './common_info';
import CmsPages from './cms_pages';
import NotFound from './not_found';

const Main = ({child}) => {
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
                        {child}
                        <Routes>
                            <Route index element={<Dashboard/>} />
                            <Route exact path="/projects" element={<Projects/>}/>
                            <Route exact path="/common_info" element={<CommonInfo/>}/>
                            <Route exact path="/cms" element={<CmsPages/>}/>
                            <Route exact path="/" element={<Dashboard/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </div>
                
            </div>
        </>
    );
}
export default Main;