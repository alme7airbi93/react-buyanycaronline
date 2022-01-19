import React from 'react';
//import Router
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

//import Navbar and Footer
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

//import Pages
import Home from "./container/Home/Home";
import BoatSearch from "./container/BoatSearch/BoatSearch";
import CarSearch from "./container/CarSearch/CarSearch";
import About from "./container/About/About";
import Contact from "./container/Contact/Contact";
import Login from "./container/Login/Login";
import Error from "./container/404Error/Error";

const App = () => {
  return (
    <>
        <Router>
            <Header />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/car-search' element={<CarSearch />} />
                <Route exact path='/boat-search' element={<BoatSearch />} />
                <Route exact path='/about' element={<About />} />
                <Route exact path='/contact' element={<Contact />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='*' element={<Error />} />
            </Routes>
            <Footer />
        </Router>
    </>
  );
}
export default App;
