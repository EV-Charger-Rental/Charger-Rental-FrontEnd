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
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import ChatIcon from "@mui/icons-material/Chat";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ChargerPage from './layouts/chargerPage/chargerPage';
import ChatPage from './layouts/chatPage/chatPage';
import Logout from './layouts/authentication/logout/logout';
import InProgressGet from "layouts/inProgress/InProgressGet";
import Historyget from "layouts/History/Historyget";
import RequestReservation from './layouts/RequestReservations/ReservationPage';
import AllChargers from './layouts/AllChargers/chargerPage';
import PenddingResevationsPage from './layouts/PenddingResevations/PenddingResevationsPage';
import InProgressRenterGet from './layouts/inProgressRenter/InProgressRenterGet';
import HistoryReservationsget from './layouts/HistoryReservations/HistoryReservationsget';
import cookie from 'react-cookies';

const userRole = cookie.load('Role');
console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ",userRole)
const routes = [
  {
    type: "collapse",
    name: "Requests",
    key: "Requests",
    route: "/Requests",
    icon: userRole === 'Provider' ? <Shop size="12px" /> : <Shop size="12px"  />, // Replace YourRenterIcon with the actual renter icon
    component: userRole === 'Provider' ? <Dashboard /> : <AllChargers  />, // Replace YourRenterComponent with the actual renter component
    noCollapse: true,
  },
  {
    type: "collapse",
    name: userRole === 'Provider' ? "Charger" :"Pendding Requests",
    key: "charger",
    route: "/charger",   
    icon: userRole === 'Provider' ? <BatteryChargingFullIcon fontSize="small" /> : <BatteryChargingFullIcon fontSize="small" />,
    component: userRole === 'Provider' ? <ChargerPage /> : <PenddingResevationsPage />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "In Progress Requests",
    key: "inprogress",
    route: "/InprogressRequests",
    icon: userRole === 'Provider' ? <Shop size="12px" /> : <Shop size="12px"  />, // Replace YourRenterIcon with the actual renter icon
    component: userRole === 'Provider' ? <InProgressGet /> : <InProgressRenterGet  />, // Replace YourRenterComponent with the actual renter component
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "History Reservations",
    key: "history",
    route: "/history",
    icon: userRole === 'Provider' ? <Shop size="12px" /> : <Shop size="12px"  />, // Replace YourRenterIcon with the actual renter icon
    component: userRole === 'Provider' ? <Historyget /> : <HistoryReservationsget  />, // Replace YourRenterComponent with the actual renter component
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Chargers Map",
    key: "tables",
    route: "/tables",
    icon: <Office size="12px" />,
    component: <Tables />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Provider Requests",
  //   key: "dashboard",
  //   route: "/dashboard",
  //   icon: <Shop size="12px" />,
  //   component: <Dashboard />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Add Reservation",
  //   key: "RenterReservation",
  //   route: "/RenterReservation",
  //   icon: <Shop size="12px" />,
  //   component: <RequestReservation />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Add Reservation",
  //   key: "RenterReservation",
  //   route: "/RenterReservation",
  //   icon: <Shop size="12px" />,
  //   component: <AllChargers />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "In Progress",
  //   key: "inprogress",
  //   route: "/inprogress",
  //   icon: <Shop size="12px" />,
  //   component: <InProgressGet />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "History Reservations",
  //   key: "history",
  //   route: "/history",
  //   icon: <Shop size="12px" />,
  //   component: <Historyget />,
  //   noCollapse: true,
  // },

  
  // {
  //   type: "collapse",
  //   name: "Pendding Requests",
  //   key: "PenddingResevationsPage",
  //   route: "/PenddingResevationsPage",   
  //   icon: <BatteryChargingFullIcon fontSize="small" />,
  //   component: <PenddingResevationsPage />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "History Requests",
  //   key: "HistoryRenterGet",
  //   route: "/HistoryRenterGet",   
  //   icon: <BatteryChargingFullIcon fontSize="small" />,
  //   component: <InProgressRenterGet />,
  //   noCollapse: true,
  // },  
  // {
  //   type: "collapse",
  //   name: "In-progress Requests",
  //   key: "InProgressRenterGet",
  //   route: "/InProgressRenterGet",   
  //   icon: <BatteryChargingFullIcon fontSize="small" />,
  //   component: <HistoryReservationsget />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Chat",
    key: "chat",
    route: "/dashboard/chat",
    icon: <ChatIcon size="12px" />,
    //  component: <ChatView />,
    component: <App />,
    noCollapse: true,
  },
 
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Out",
    key: "sign-up",
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
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
 
  
];

export default routes;


// const userRole = getUserRole(); // Replace this with the logic to determine the user's role

// const routes = [
//   // Other routes...
//   {
//     type: "collapse",
//     name: "Add Reservation",
//     key: "RenterReservation",
//     route: "/RenterReservation",
//     icon: userRole === "provider" ? <Shop size="12px" /> : <YourRenterIcon size="12px" />, // Replace YourRenterIcon with the actual renter icon
//     component: userRole === "provider" ? <AllChargers /> : <YourRenterComponent />, // Replace YourRenterComponent with the actual renter component
//     noCollapse: true,
//   },
//   // Other routes...
// ];

// export default routes;
