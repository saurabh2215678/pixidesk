import React, {useState,  useEffect, useRef} from "react";
import { ReactSVG } from 'react-svg';
import { IconButton, ButtonBase, Slide, Dialog, Button } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import userIcon from '../../assets/svg/user-solid.svg';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Fancybox from "../fancybox";
import "@fancyapps/ui/dist/fancybox.css";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Avtar = ({onChange}) => {

    const [selectedProfilePic, setSelectedProfilePic] = useState();
    const [preview, setPreview] = useState();
    const [profilePicModelOpen, setProfilePicModelOpen] = useState(false);

    const [cropData, setCropData] = useState("");
    const [cropper, setCropper] = useState();
    const imageInputRef = useRef();

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
        cropper.getCroppedCanvas({fillColor:"#fff"}).toBlob((blob)=>{
            const objectUrl = URL.createObjectURL(blob)
            setCropData(objectUrl);
            onChange(objectUrl);
            handleProfilePicModelClose();
        });
        }
      };


    const handleProfilePicModelOpen = () => {
        setProfilePicModelOpen(true);
    };
  
    const handleProfilePicModelClose = () => {
        imageInputRef.current.value="";
        setProfilePicModelOpen(false);
    };

    useEffect(()=>{
        if(!selectedProfilePic){
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedProfilePic)
        setPreview(objectUrl)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    },[selectedProfilePic]);

    useEffect(()=>{
        if(!preview){
            // show toast for Image not selected
            return;
        }
        handleProfilePicModelOpen();
        // open modal with privew image
    },[preview]);


    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedProfilePic(undefined)
            return
        }
        // I've kept this example simple by using the first image instead of multiple
        setSelectedProfilePic(e.target.files[0]);
    }

    return(
        <>
        <div className="avtar_box">
            <ButtonBase>
                {cropData !== '' ?
                <Fancybox>
                    <a href={cropData} data-fancybox>
                        <img alt="profile" className="avtar_image" src={cropData}/>
                    </a>
                </Fancybox>
                :
                <label className="avtar_icon">
                    <ReactSVG src={userIcon} />
                    <input hidden onChange={onSelectFile} accept="image/jpeg, image/png" type="file" />
                </label>
                }
            </ButtonBase>
            <div className="camera-icon">
                <IconButton color="secondary" variant="contained" aria-label="upload picture" component="label">
                    <input ref={imageInputRef} hidden onChange={onSelectFile} accept="image/jpeg, image/png" type="file" />
                    <PhotoCamera />
                </IconButton>
            </div>
        </div>
        <Dialog
            open={profilePicModelOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleProfilePicModelClose}
            aria-describedby="alert-dialog-slide-description"
        >
        <div className="image_cropper" style={{minWidth: 500, minHeight: 500}}>
            <Cropper
                style={{ height: 400, width: "100%" }}
                zoomTo={0}
                initialAspectRatio={1}
                aspectRatio={1}
                className="crop_box"
                src={preview}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={true}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                onInitialized={(instance) => {
                    setCropper(instance);
                }}
                guides={true}
                />
                <div className="d-flex p-4">
                    <Button variant="contained" className="text-white"  onClick={getCropData} disableElevation fullWidth>Crop</Button>
                    <span className="px-2"></span>
                    <Button variant="contained" className="text-white"  onClick={handleProfilePicModelClose} color="error" disableElevation fullWidth>Cancel</Button>
                </div>
        </div>
        </Dialog>
        </>
    );
}
export default Avtar;