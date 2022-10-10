import React from 'react';
import Lottie from "lottie-react";
import loadingLottie from "../../assets/lottiefiles/loading.json";
import {LinearProgress} from '@mui/material';

const FullPageLoading = ({progressLoader}) => {
    return (
        <div className="fullPage_loading">
            <div className="loading_box">
                <Lottie animationData={loadingLottie} />
                {progressLoader &&
                    <LinearProgress sx={{my:2}} variant="determinate" value={progressLoader.profile_pic_upload_progress} />
                }
                
                <p className="para-lg3">{
                progressLoader ? 
                progressLoader?.updating_status === "profile_picture" ? 'Uploading Profile Picture...':
                progressLoader?.updating_status === "profile" ? 'Setting Up Your Account...':
                'Please wait..':'Please wait..'}</p>
            </div>
        </div>
    );
}
export default FullPageLoading;