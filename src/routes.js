import Dashboard from "layouts/dashboard";
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

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Charger",
    key: "charger",
    route: "/charger",   
    icon: <BatteryChargingFullIcon fontSize="small" />,
    component: <ChargerPage />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Chat",
  //   key: "chat",
  //   route: "/dashboard/chat",
  //   icon: <ChatIcon size="12px" />,
  //   //  component: <ChatView />,
  //   component: <App />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    route: "/tables",
    icon: <Office size="12px" />,
    component: <Tables />,
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
    name: "Chat",
    key: "chat",
    route: "/chat",
    icon: <SpaceShip size="12px" />,
    // component: <ChatView />,
    component: <App />,
    noCollapse: true,
  },
 
  
];

export default routes;
