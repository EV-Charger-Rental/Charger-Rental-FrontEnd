import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import curved6 from "assets/images/curved-images/bigstock-Electric-Vehicle-Charging-Stat-433580789_1024X684.png";
import { useNavigate } from "react-router-dom";
import { FormatIndentDecreaseSharp } from "@mui/icons-material";

function SignUp() {
  const [agreement, setAgreement] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    role: "renter", // Default role
  });
  const [providerOptionsVisible, setProviderOptionsVisible] = useState(false); // Track visibility of provider options
  const navigate = useNavigate();

  const handleSetAgreement = () => setAgreement(!agreement);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Derive capabilities based on the selected role
      const capabilities =
        formData.role === "Provider"
          ? ["read", "create", "update", "delete"]
          : ["read", "create", "update", "delete"];
  
      // Create a new object with the desired fields, including capabilities
      const dataToPost = {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        password: formData.password,
        role: formData.role,
        capabilities: capabilities, // Include capabilities based on role
      };
  
      const response = await fetch("https://ev-rental.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToPost),
      });
  
      if (response.ok) {
        // Successfully signed up, now make the provider call if the role is Provider
        navigate("/authentication/sign-in");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRoleChange = (newRole) => {
    setFormData({
      ...formData,
      role: newRole,
    });

    
  };

  return (
    <BasicLayout
      title="Welcome!"
       description="Create Your Account"
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="large" marginButtom="1px">
            Sign Up
          </SoftTypography>
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={handleSubmit}>
            <SoftBox mb={2}>
              <SoftInput
                name="username"
                placeholder="User Name"
                value={formData.username}
                onChange={handleInputChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </SoftBox>

            {/* Role selection */}
            <SoftBox mb={4} display="flex" alignItems="center" justifyContent="center">
              <SoftBox>
                <SoftTypography
                  variant="button"
                  fontWeight="bold"
                  sx={{
                    cursor: "pointer",
                    userSelect: "none",
                    backgroundColor:
                      formData.role === "renter" ? "primary.main" : "transparent",
                    color: formData.role === "renter" ? "#fff" : "inherit",
                    padding: "8px 16px",
                    borderRadius: "4px",
                  }}
                  onClick={() => handleRoleChange("renter")}
                >
                  Renter
                </SoftTypography>
                <SoftTypography
                  variant="button"
                  fontWeight="bold"
                  sx={{
                    cursor: "pointer",
                    userSelect: "none",
                    backgroundColor:
                      formData.role === "Provider" ? "primary.main" : "transparent",
                    color: formData.role === "Provider" ? "#fff" : "inherit",
                    marginRight: "auto",
                    marginLeft: "auto",
                    padding: "8px 16px",
                    borderRadius: "4px",
                  }}
                  onClick={() => handleRoleChange("Provider")}
                >
                  Provider
                </SoftTypography>
              </SoftBox>
            </SoftBox>

         
        

            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgreement} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgreement}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
            </SoftBox>

            <SoftBox mt={4} mb={1}>
              <SoftButton type="submit" variant="gradient" color="dark" fullWidth>
                Sign Up
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
