import React from "react";
import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function HistoryCard({ charger_id, renter_id, Provider_id, start_time, end_time, total_price, reservation_status }) {
  return (
    <SoftBox>
      <SoftBox
        component="li"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="flex-start"
        bgColor="grey-100"
        borderRadius="lg"
        p={3}
        mb={1}
        mt={2}
      >
        <SoftBox width="100%">
          <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize" style={{ fontSize: "18px" }}>
            Charger ID: {charger_id}
          </SoftTypography>
          <SoftBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            <SoftTypography variant="caption" color="text" fontWeight="bold" style={{ fontSize: "14px" }}>
              Renter ID:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize" style={{ fontSize: "14px" }}>
                {renter_id}
              </SoftTypography>
            </SoftTypography>
            <SoftTypography variant="caption" color="text" fontWeight="bold" style={{ fontSize: "14px" }}>
              Owner ID:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium" style={{ fontSize: "14px" }}>
                {Provider_id}
              </SoftTypography>
            </SoftTypography>
            <SoftTypography variant="caption" color="text" fontWeight="bold" style={{ fontSize: "14px" }}>
              Start Time:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium" style={{ fontSize: "14px" }}>
                {start_time}
              </SoftTypography>
            </SoftTypography>
            <SoftTypography variant="caption" color="text" fontWeight="bold" style={{ fontSize: "14px" }}>
              End Time:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium" style={{ fontSize: "14px" }}>
                {end_time}
              </SoftTypography>
            </SoftTypography>

            <SoftTypography variant="caption" color="text" fontWeight="bold" style={{ fontSize: "14px" }}>
              Reservation Status:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium" style={{ fontSize: "14px" }}>
                {reservation_status}
              </SoftTypography>
            </SoftTypography>

            <SoftTypography variant="caption" color="text" fontWeight="bold" style={{ fontSize: "14px" }}>
              Total Price:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium" style={{ fontSize: "14px" }}>
                {total_price}
              </SoftTypography>
            </SoftTypography>

          </SoftBox>
        </SoftBox>
      </SoftBox>
    </SoftBox>
  );
}

HistoryCard.propTypes = {
  charger_id: PropTypes.number.isRequired,
  renter_id: PropTypes.number.isRequired,
  Provider_id: PropTypes.number.isRequired,
  start_time: PropTypes.string.isRequired,
  end_time: PropTypes.string.isRequired,
  total_price: PropTypes.number.isRequired,
  reservation_status: PropTypes.string.isRequired,
};

export default HistoryCard;
