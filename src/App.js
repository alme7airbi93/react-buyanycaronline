import React, {useState} from "react";
//import Router
import { HashRouter as Router, Routes, Route  } from "react-router-dom";

//import Navbar and Footer
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

//import Pages
import Home from "./container/Home/Home";
import BoatSearch from "./container/BoatSearch/BoatSearch";
import BoatDetails from "./container/BoatDetails/BoatDetails";
import CarSearch from "./container/CarSearch/CarSearch";
import PlateNumbersSearch from "./container/PlateNumbersSearch/PlateNumbersSearch";
import CarDetails from "./container/CarDetails/CarDetails";
import About from "./container/About/About";
import Contact from "./container/Contact/Contact";
import Login from "./container/Login/Login";
import Error from "./container/404Error/Error";
import {UserRoutes, AdminModeratorRoutes} from "./routes/ProtectedRoutes";
import UserProfile from "./container/UserProfile/UserProfile";
import NewAds from "./container/NewAds/NewAds";
import ManageAds from "./container/ManageAds/ManageAds";
import MonitorPage from "./container/MonitorPage/MonitorPage";
import {UserContext} from "./context/Context";
import { UserContextProvider } from "./context/Context";
import AdsEdit from "./container/AdsEdit/AdsEdit";



const App = () => {

	const [user, setUser] = useState({});
	return (
		<UserContextProvider>
			<Router>
				<Header />
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route exact path='/plate-numbers-search' element={<PlateNumbersSearch />} />
					<Route exact path='/car-search' element={<CarSearch />} />
					<Route exact path='/car-detail/:Id' element={<CarDetails />} />
					<Route exact path='/boat-search' element={<BoatSearch />} />
					<Route exact path='/boat-detail' element={<BoatDetails />} />
					<Route exact path='/about' element={<About />} />
					<Route exact path='/user-profile' element={<UserRoutes Component={UserProfile} />} />
					<Route exact path='/new-ads' element={<UserRoutes Component={NewAds} />} />
					<Route exact path='/manage-ads' element={<AdminModeratorRoutes Component={ManageAds} />} />
					<Route exact path='/monitor-page' element={<AdminModeratorRoutes Component={MonitorPage} />} />
					<Route exact path='/contact' element={<Contact />} />
					<Route exact path='/login' element={<Login />} />
					<Route exact path='*' element={<Error />} />
					<Route exact path={`/ads-edit/:Id`} element={<UserRoutes Component={AdsEdit} />}/>
				</Routes>
				<Footer />
			</Router>
		</UserContextProvider>
	);
};
export default App;
