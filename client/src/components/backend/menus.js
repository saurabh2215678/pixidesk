import React from "react";
import { ReactSVG } from 'react-svg';
import dashboardIcon from '../../assets/svg/dashboard_icon.svg';
import projectsIcon from '../../assets/svg/projects.svg';
import {NavLink} from "react-router-dom";

const Menus = ({ristrictItems}) => {
    return(
        <ul className={ristrictItems ? 'ristricted' :''}>
            <li><NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')}  to="/admin" end><ReactSVG className="side_icon" src={dashboardIcon} /> Dashboard</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/admin/projects"><ReactSVG className="side_icon" src={projectsIcon} /> Projects</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/admin/pages"><ReactSVG className="side_icon" src={projectsIcon} />Pages</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/admin/cms"><ReactSVG className="side_icon" src={projectsIcon} /> Cms Pages</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/admin/common_info"><ReactSVG className="side_icon" src={projectsIcon} /> Common Info</NavLink></li>
        </ul>
    );
}
export default Menus;