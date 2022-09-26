import React from "react";
import { ReactSVG } from 'react-svg';
import dashboardIcon from '../../assets/svg/dashboard_icon.svg';
import projectsIcon from '../../assets/svg/projects.svg';
import {NavLink} from "react-router-dom";

const Menus = ({ristrictItems}) => {
    return(
        <ul className={ristrictItems ? 'ristricted' :''}>
            <li><NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')}  to="/" end><ReactSVG className="side_icon" src={dashboardIcon} /> Dashboard</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/projects"><ReactSVG className="side_icon" src={projectsIcon} /> Projects</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/common_info"><ReactSVG className="side_icon" src={projectsIcon} /> Common Info</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/cms"><ReactSVG className="side_icon" src={projectsIcon} /> Cms Pages</NavLink></li>


            <li><NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')}  to="/" end><ReactSVG className="side_icon" src={dashboardIcon} /> Dashboard</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/projects"><ReactSVG className="side_icon" src={projectsIcon} /> Projects</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/common_info"><ReactSVG className="side_icon" src={projectsIcon} /> Common Info</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/cms"><ReactSVG className="side_icon" src={projectsIcon} /> Cms Pages</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')}  to="/" end><ReactSVG className="side_icon" src={dashboardIcon} /> Dashboard</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/projects"><ReactSVG className="side_icon" src={projectsIcon} /> Projects</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/common_info"><ReactSVG className="side_icon" src={projectsIcon} /> Common Info</NavLink></li>
            <li><NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/cms"><ReactSVG className="side_icon" src={projectsIcon} /> Cms Pages</NavLink></li>
        </ul>
    );
}
export default Menus;