/* eslint-disable react/prop-types */
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import curved6 from "assets/images/curved-images/curved14.jpg";
import Card from "@mui/material/Card";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import AboutUsCom from "./AboutUsCom";
import Footer from "layouts/authentication/components/Footer";


function AboutUs() {
  return (
    <>
    <DefaultNavbar/>
    <AboutUsCom/>
    <Footer/>
    </>
  );
}

export default AboutUs;
