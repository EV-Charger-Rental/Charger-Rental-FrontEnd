import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

function Bill({ ChargerType, Chargerlocation, status, price, noGutter }) {
  return (
    <SoftBox
      component="li"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor="grey-100"
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
      // text-size="24px"
    >
      <SoftBox width="100%">
        <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize" style={{ fontSize: "18px" }}>
          {ChargerType}
        </SoftTypography>
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={1}
        >
          <SoftTypography variant="caption" color="text" fontWeight="bold"  style={{ fontSize: "14px" }} >
            Charger Address:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize"  style={{ fontSize: "14px" }}>
              {Chargerlocation}
            </SoftTypography>
          </SoftTypography>
          <SoftTypography variant="caption" color="text" fontWeight="bold" style={{ fontSize: "14px" }}>
            Status:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium" style={{ fontSize: "14px" }}>
              {status}
            </SoftTypography>
          </SoftTypography>
          <SoftTypography variant="caption" color="text" fontWeight="bold"  style={{ fontSize: "14px" }}>
            Price:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium"  style={{ fontSize: "14px" }}>
              {price} JD
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={1} style={{ display: 'flex', justifyContent: 'right' }}>
          <SoftButton variant="text" color="error">
            <Icon>delete</Icon>&nbsp;delete
          </SoftButton>
          <SoftButton variant="text" color="dark">
            <Icon>edit</Icon>&nbsp;edit
          </SoftButton>
        </SoftBox>

      </SoftBox>
    </SoftBox>
  );
}

// Setting default values for the props of Bill
Bill.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Bill.propTypes = {
  ChargerType: PropTypes.string.isRequired,
  Chargerlocation: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired, // Changed to number
  noGutter: PropTypes.bool,
};

export default Bill;
