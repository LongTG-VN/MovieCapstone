import React from "react";
import { Routes,Route } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate";

const App = () => {
  return (

   <Routes>
    <Route path="/" element={<HomeTemplate/>}> 

    </Route>
   </Routes>
 
  )
};

export default App;
