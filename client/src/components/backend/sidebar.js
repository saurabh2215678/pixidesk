import React,{useEffect, useState} from "react";
import { ReactSVG } from 'react-svg';
import logo from '../../assets/svg/logo.svg';
import toggleIcon from '../../assets/svg/sidebar_toggle_icon.svg';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Menus from "./menus";
import {closeSidebar, openSidebar, toggleSidebar} from "../../Redux/actions/sidebarActions";

import { useSelector, useDispatch } from 'react-redux'

const SideBar = () => {
    const counter = useSelector((state) => state.sidebarOpened);

    const dispatch = useDispatch();

    useEffect(()=>{
        console.log(counter);
    },[]);

    const handleUpdate = (value)=>{
        var element = document.getElementsByClassName('sidebar')[0];
        if(value.scrollTop > 1){
            element.classList.add('scrolled');
        }else{
            element.classList.remove('scrolled');
        }
    }


    return(
        <aside className={`sidebar`}>
            <div className="sidenav_header">
                <div className="logo">
                    <ReactSVG className="logo_icon" src={logo} />
                    <h1 className="logo_text para-lg2">PIXIDESK</h1>
                </div>
                
                <ReactSVG onClick={()=>dispatch(openSidebar)} className="toggle_icon" src={toggleIcon} />
            </div>
            <Scrollbars
            onUpdate={handleUpdate}
            className="sidebar_menu_list">
                <Menus/>
            </Scrollbars>
            
        </aside>
    );
}
export default SideBar;