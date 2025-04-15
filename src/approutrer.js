import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./login/login";
import FoodOrder from "./foodorder/foodorder";
import Table from "./table/table";
import QrCode from "./qrcode/qrcode";

const AppRouter = () =>
{
    const basename = window.location.hostname === 'localhost' ? '' : '/Qrdin_adminpanel';
    return(<>
    <div>
        <Router basename={basename}>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/table" element={<Table />} />
        <Route path="/food-items" element={<FoodOrder />} />
        <Route path="/qr-code" element={<QrCode />} />
       
        </Routes>
        </Router>
    </div>
    </>)
}

export default AppRouter;