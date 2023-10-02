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
import curved6 from "assets/images/curved-images/curved14.jpg";
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
    chargerType: "", // New field for Charger Type
    pricePerHour: "", // New field for Price per Hour
  });
  const [providerOptionsVisible, setProviderOptionsVisible] = useState(false); // Track visibility of provider options
  const navigate = useNavigate();

  const handleSetAgreement = () => setAgreement(!agreement);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a new object with only the desired fields
      const dataToPost = {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        password: formData.password,
        role: formData.role,
      };
      console.log("/////////////////",dataToPost);
 
      const response = await fetch("https://ev-rental.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToPost),
       

      });
      console.log("*******************",JSON.stringify(dataToPost));
    
      if (response.ok) {
        // Successfully signed up, now make the provider call if the role is Provider
        if (formData.role === "Provider") {
          const providerResponse = await fetch("https://ev-rental.onrender.com/api/v2/charger", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: formData.chargerType,
              status: "available",
              owner_id: 1, // You can set this to the user's ID if it's the same
              price: formData.pricePerHour,
              Chargerlocation: formData.location,
            }),
          });

          if (providerResponse.ok) {
            // Handle provider creation success
          } else {
            // Handle provider creation error
          }
        }

        navigate("/authentication/sign-in");
      } else {
        // Handle signup error
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

    // Show provider options when "Provider" is selected
    if (newRole === "Provider") {
      setProviderOptionsVisible(true);
    } else {
      setProviderOptionsVisible(false);
    }
  };

  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to sign up for your project for free."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register with
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator />
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

            {/* Provider options */}
            {providerOptionsVisible && (
              <>
                <SoftBox mb={2}>
                  <select
                    name="chargerType"
                    value={formData.chargerType}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      backgroundColor: "#fff",
                      color: "#333",
                      fontSize: "14px",
                    }}
                  >
                    <option value="" disabled selected>
                      Select Charger Type
                    </option>
                    <option value="Charger Type 1">Charger Type 1</option>
                    <option value="Charger Type 2">Charger Type 2</option>
                    <option value="Charger Type 3">Charger Type 3</option>
                    <option value="Charger Type 4">Charger Type 4</option>
                  </select>
                </SoftBox>

                <SoftBox mb={2}>
                  <select
                    name="pricePerHour"
                    value={formData.pricePerHour}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      backgroundColor: "#fff",
                      color: "#333",
                      fontSize: "14px",
                    }}
                  >
                    <option value="" disabled selected style={{ color: "#ccc" }}>
                      Select Price per Hour
                    </option>
                    <option value="Price 1">$1 per hour</option>
                    <option value="Price 2">$2 per hour</option>
                    <option value="Price 3">$3 per hour</option>
                    <option value="Price 4">$4 per hour</option>
                  </select>
                </SoftBox>
              </>
            )}

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
