import Dashboard from "layouts/dashboard/RequestPage";
import Tables from "layouts/tables";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import App from "./layouts/src/App";
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import { Map } from '@mui/icons-material'; 
import { AccountCircle } from '@mui/icons-material'; 
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import ChatIcon from "@mui/icons-material/Chat";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ChargerPage from './layouts/chargerPage/chargerPage';
import Logout from './layouts/authentication/logout/logout';
import InProgressGet from "layouts/inProgress/InProgressGet";
import Historyget from "layouts/History/Historyget";
import RequestReservation from './layouts/RequestReservations/ReservationPage';
import AllChargers from './layouts/AllChargers/chargerPage';
import PenddingResevationsPage from './layouts/PenddingResevations/PenddingResevationsPage';
import InProgressRenterGet from './layouts/inProgressRenter/InProgressRenterGet';
import HistoryReservationsget from './layouts/HistoryReservations/HistoryReservationsget';
import cookie from 'react-cookies';
import { HourglassEmpty } from '@mui/icons-material'; // Import the MUI icon component for "In Progress"
import { History } from '@mui/icons-material'; // Import the MUI icon component for "History"
import { ListAlt } from '@mui/icons-material'; // Import the MUI icon component for "Requests"
import { Pending } from '@mui/icons-material';

const userRole = cookie.load('role');
const routes = [
  {
    type: "collapse",
    name: "Requests",
    key: "Requests",
    route: "/Requests",
    icon: <ListAlt fontSize="small" />, // Replace with the MUI "Requests" icon component
    component: userRole === 'Provider' ? <Dashboard /> : <AllChargers />,
    noCollapse: true,
  }
  ,
  {
    type: "collapse",
    name: userRole === 'Provider' ? "Charger" : "Pendding Requests",
    key: "charger",
    route: "/charger",
    icon: userRole === 'Provider' ? <BatteryChargingFullIcon fontSize="small" /> : <Pending  fontSize="small" />,
    component: userRole === 'Provider' ? <ChargerPage /> : <PenddingResevationsPage />,
    noCollapse: true,
  }, 
  {
    type: "collapse",
    name: "In Progress Requests",
    key: "inprogress",
    route: "/InprogressRequests",
    icon: <HourglassEmpty fontSize="small" />, // Replace with the MUI "In Progress" icon component
    component: userRole === 'Provider' ? <InProgressGet /> : <InProgressRenterGet />,
    noCollapse: true,
  }, 
 {
    type: "collapse",
    name: "History Reservations",
    key: "history",
    route: "/history",
    icon: <History fontSize="small" />, // Replace with the MUI "History" icon component
    component: userRole === 'Provider' ? <Historyget /> : <HistoryReservationsget />,
    noCollapse: true,
  }
  ,
  {
    type: "collapse",
    name: "Chargers Map",
    key: "Chargers Map",
    route: "/ChargersMap",
    icon: <Map fontSize="small" />, // Replace with the MUI map icon component
    component: <Tables />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Chat",
    key: "chat",
    route: "/chat",
    icon: <ChatIcon size="12px" />,
    //  component: <ChatView />,
    component: <App />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Out",
    key: "sign-Out",
    route: "/authentication/sign-in",
    icon: <ExitToAppIcon fontSize="small" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <AccountCircle fontSize="small" />,
    component: <SignUp />,
    noCollapse: true,
  }
];

export default routes;



