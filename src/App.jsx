import {Route, Routes } from "react-router-dom"
import HomePage from "./pages/homepage"
import Playground from "./pages/secondpage/playground"
import AboutUs from "./pages/aboutus"
import ContactUs from "./pages/contactus"

function App() {
  

  return (
    <>
    
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/playground" element={<Playground  />} />
      <Route path="/AboutUs" element={<AboutUs/>} />
      <Route path="/ContactUs" element={<ContactUs/>} />
    </Routes>
   
      
    </>
  )
}

export default App
