import React from 'react'
import Style from './App.css'
import Navbar from "./component/Nav"
import AllRoutes from './routes/AllRoutes';
import Footer from './component/Footer';
function App() {
  return (
    <>
    <Navbar/>
    <AllRoutes/>
    <Footer/>
    </>
  );
}

export default App;
