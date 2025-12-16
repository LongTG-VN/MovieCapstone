import React from "react";
import { Routes,Route } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate";
import HomeCompoment from "./components/pages/Home";
import ContactComponen from "./components/pages/Contact";
import NewsComponent from "./components/pages/News";
import LoginComponent from "./components/pages/Login";
import RegisterComponent from "./components/pages/Register";
import DetailComponent from "./components/pages/Detail";

const App = () => {
  return (

   <Routes>
    <Route path="/" element={<HomeTemplate/>}> 
       <Route path="/home" element={<HomeCompoment/>}/>
       <Route path="/contact" element={<ContactComponen/>}/>
       <Route path="/news" element={<NewsComponent/>}/>
       <Route path="/login" element={<LoginComponent/>}/>
       <Route path="/register" element={<RegisterComponent/>}/>
       <Route path="/detail/:id" element={<DetailComponent/>}/>
    </Route>
    
   </Routes>
 
  )
};

export default App;
