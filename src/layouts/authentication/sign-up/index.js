import { useState } from "react";
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

function SignUp() {
  const [agreement, setAgreement] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    role: "Provider", // Default role
  });
  const navigate = useNavigate();

  const handleSetAgreement = () => setAgreement(!agreement);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://ev-rental.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/dashboard");
      } else {
        // Handle error here
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
            <SoftBox mb={2}>
              <SoftBox>
                <SoftTypography
                  variant="button"
                  fontWeight="bold"
                  sx={{
                    cursor: "pointer",
                    userSelect: "none",
                    backgroundColor:
                      formData.role === "Provider" ? "primary.main" : "transparent",
                    color: formData.role === "Provider" ? "#fff" : "inherit",
                    marginRight: "16px",
                    padding: "8px 16px",
                    borderRadius: "4px",
                  }}
                  onClick={() => handleRoleChange("Provider")}
                >
                  Provider
                </SoftTypography>
                <SoftTypography
                  variant="button"
                  fontWeight="bold"
                  sx={{
                    cursor: "pointer",
                    userSelect: "none",
                    backgroundColor:
                      formData.role === "Renter" ? "primary.main" : "transparent",
                    color: formData.role === "Renter" ? "#fff" : "inherit",
                    padding: "8px 16px",
                    borderRadius: "4px",
                  }}
                  onClick={() => handleRoleChange("Renter")}
                >
                  Renter
                </SoftTypography>
              </SoftBox>
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