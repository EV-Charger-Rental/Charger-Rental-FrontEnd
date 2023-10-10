
import Card from "@mui/material/Card";

// EV Charger Rental React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// EV Charger Rental React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import MapComponent from './data/mapgetchargers';

function Tables() {
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">chargers table</SoftTypography>
            </SoftBox>
           
          </Card>
        </SoftBox>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
           
          </SoftBox>
          <SoftBox>
            <MapComponent/>
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
