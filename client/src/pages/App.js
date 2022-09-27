import React from "react";
import Backend from "./backend/main.js";
import Frontend from "./frontend/main.js";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./backend/login.js";
import SignUp from "./backend/signup.js";

const App = () => {
    return(
        <>
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