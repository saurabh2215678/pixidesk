import React,{useEffect, useState} from "react";
import Backend from "./backend/main.js";
import Frontend from "./frontend/main.js";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./backend/login.js";
import SignUp from "./backend/signup.js";


import {useSelector} from "react-redux";
import FullPageLoading from "../components/backend/fullPageLoading.js";

const App = () => {
  const {isSigningUp, profileStatus} = useSelector((state) => state);
  const [progress, setProgress] = useState();
  const [progressObject, setProgressObject] = useState();

  useEffect(()=>{
    console.log(isSigningUp)
  },[isSigningUp])

  useEffect(()=>{
    if(Object.keys(profileStatus).length !== 0){//means profileStatus is not empty
      setProgress(profileStatus.updating_status);
      setProgressObject(profileStatus);
    }else{
      setProgress();
      setProgressObject();
    }
  },[profileStatus])

    return(
        <>
        {(isSigningUp && !progress) && <FullPageLoading/>}
        {progressObject?.updating_status && <FullPageLoading progressLoader={progressObject} />}
          <Router>
            <Routes>
              <Route index element={<Frontend/>}/>
              <Route exact path="admin/login" element={<Login/>}/>
              <Route exact path="admin/signup" element={<SignUp/>}/>
              <Route exact path="admin/*" element={<Backend/>}/>
            </Routes>
          </Router>
        </>
    )
}
export default App;