import React, { useEffect, useState } from "react";
import { Avatar, ButtonBase, Tooltip } from '@mui/material';
import { usePopper } from 'react-popper';
import {useAuth} from '../../contexts/AuthContext';
import {Navigate, NavLink, useLocation} from "react-router-dom";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { motion, AnimatePresence } from "framer-motion";

import {useSelector} from "react-redux";


const HeaderAccountMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);

    const user = useSelector((state) => state.user);
    // console.log(user);

    const { logout } = useAuth();
    const [err, setError] = useState("");
    const location = useLocation();

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    });


    const handleModelClose = () => setMenuOpen(false);
    const handleModeltoggle = () => setMenuOpen(!menuOpen);

    const handleLogout = async () => {
        setError("");
        try{
            await logout();
            <Navigate
                to={'login'}
                state={{ from: location }} // <-- pass in route state
                replace
            />
        }catch(e){
            setError(e.code);
            console.log(err);
        }
    }

    useEffect(()=>{
         document.addEventListener('click', (e)=>{;
            if(menuOpen && 
                !(e.target.classList.contains('header_account_menu_item') ||
                  e.path[1].classList.contains('header_account_menu_button')) 
                ){
                handleModelClose();
            }
         });
    },[menuOpen])

    return(
        <div className="header_account_menu">
            <Tooltip title="accounts">
                <ButtonBase style={{borderRadius:"50%"}}  ref={setReferenceElement} className="header_account_menu_button" onClick={handleModeltoggle}>
                    <Avatar sx={{ bgcolor: "var(--theme-color)" }}>OP</Avatar>
                </ButtonBase>
            </Tooltip>
            <AnimatePresence>
            {menuOpen &&
                <div ref={setPopperElement} className="header_account_menu_wrapper" style={styles.popper} {...attributes.popper}>
                    <motion.div
                    initial={{ y:150, opacity: 0 }}
                    animate={{ y:0, opacity: 1 }}
                    exit={{ y:150, opacity: 0 }}
                    >
                        <div className="header_account_menu_box">
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton component={NavLink} to="profile" varient="secondary">
                                        <ListItemIcon>
                                            <PersonIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Profile" />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton onClick={handleLogout}>
                                        <ListItemIcon>
                                            <LogoutIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Logout" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </div>
                        <div className="tooltip-arrows" ref={setArrowElement} style={styles.arrow} {...attributes.arrow}/>
                    </motion.div>
                </div>
            }
            </AnimatePresence>
        </div>
    );
}
export default HeaderAccountMenu;