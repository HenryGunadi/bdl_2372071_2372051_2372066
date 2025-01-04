import { NavLink } from "react-router-dom";
import Barcode from "../components/Barcode";
import DashboardPage from "./DashboardPage";

function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
     <DashboardPage />
    </div>
  );
}

export default Home;
