import React from "react";
import { ReactSVG } from 'react-svg';
import { IconButton, ButtonBase } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import userIcon from '../../assets/svg/user-solid.svg';

const Avtar = () => {
    return(
        <div className="avtar_box">
            <ButtonBase>
                <img alt="profile" className="avtar_image" src="https://bookingmedtravel.com/img/userimage.png"/>
                <label className="avtar_icon">
                    <ReactSVG src={userIcon} />
                    <input hidden accept="image/*" type="file" />
                </label>
            </ButtonBase>
            <div className="camera-icon">
                <IconButton color="secondary" variant="contained" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" />
                    <PhotoCamera />
                </IconButton>
            </div>
        </div>
    );
}
export default Avtar;