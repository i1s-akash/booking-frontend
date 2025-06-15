import { Routes, Route } from "react-router-dom";
import Bookings from "../pages/admin/bookings";
import Home from "../pages/home";
import Slots from "../pages/user/slots";
import Confirmation from "../pages/user/confirmation";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/slots" element={<Slots />} />
      <Route path="/confirmation/:id" element={<Confirmation />} />
      <Route path="/admin/bookings" element={<Bookings />} />
    </Routes>
  );
};
