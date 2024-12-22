import Navbar from "../../components/navbar/navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
}
