import React,{useEffect} from "react";
import Menus from "./menus";

import HeaderAccountMenu from "./headerAccountMenu";

const Header = () => {
    useEffect(()=>{
        let headerHight = document.getElementsByTagName('header')[0]?.clientHeight;
        document.documentElement.style.setProperty('--header-hight', `${headerHight}px`);
        window.addEventListener('resize', () => {
            let headerHight = document.getElementsByTagName('header')[0]?.clientHeight;
            document.documentElement.style.setProperty('--header-hight', `${headerHight}px`);
        });
    },[]);
    return(
        <header>
            <div className="left">
                <Menus ristrictItems={true}/>
            </div>
            <div className="right">
                <HeaderAccountMenu/>
            </div>
        </header>
    );
}
export default Header;