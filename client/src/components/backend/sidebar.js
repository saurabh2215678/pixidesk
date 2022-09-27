import React, { useEffect } from "react";
import { ReactSVG } from 'react-svg';
import logo from '../../assets/svg/logo.svg';
import toggleIcon from '../../assets/svg/sidebar_toggle_icon.svg';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Menus from "./menus";
// redux import
import {useSelector, useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../../state/index";
import {Link} from "react-router-dom";

const SideBar = () => {
    // redux functions implimentation
    const sidebarOpened = useSelector((state) => state.sidebarOpened);
    const dispatch = useDispatch();
    const {toggleSidebar} = bindActionCreators(actionCreators, dispatch);
    useEffect(()=>{
        if(sidebarOpened){
            document.body.classList.add('sidebar_opened');
        }else{
            document.body.classList.remove('sidebar_opened');
        }
    },[sidebarOpened]);


    const handleUpdate = (value)=>{
        var element = document.getElementsByClassName('sidebar')[0];
        if(value.scrollTop > 1){
            element.classList.add('scrolled');
        }else{
            element.classList.remove('scrolled');
        }
    }


    return(
        <aside className={`sidebar ${sidebarOpened ? "opened" : "collapsed"}`}>
            <div className="sidenav_header">
                <Link className="logo" to="/admin">
                    <ReactSVG className="logo_icon" src={logo} />
                    <h1 className="logo_text para-lg2">PIXIDESK</h1>
                </Link>
                
                <ReactSVG onClick={()=>toggleSidebar()} className="toggle_icon" src={toggleIcon} />
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