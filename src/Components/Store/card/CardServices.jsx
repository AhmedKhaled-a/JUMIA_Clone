import React, { useState } from "react";
import { ReactComponent as IconTruckFill } from "bootstrap-icons/icons/truck.svg";
import { ReactComponent as IconLifePreserverFill } from "bootstrap-icons/icons/life-preserver.svg";
import { ReactComponent as IconArrowCounterclockwiseFill } from "bootstrap-icons/icons/arrow-counterclockwise.svg";
import { useTranslation } from "react-i18next";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import TabPanel from "./TabPanel";

const CardServices = (props) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <div>
      {/* Card Services Provider */}
      <div className="card">
        <div className="card-header font-weight-bold text-uppercase">
          {t("DELIVERY & RETURNS")}
        </div>
        <div>
          <h6 className="text-center">Choose your location</h6>
          <div className="mb-3">
            <FormControl fullWidth>
              <InputLabel id="delivery-type-label">Delivery Type</InputLabel>
              <Select
                labelId="delivery-type-label"
                id="delivery-type-select"
                value={""}
                onChange={handleChange}
                label="Delivery Type"
              >
                <MenuItem value={"Cairo"}>Cairo</MenuItem>
                <MenuItem value={"Giza"}>Giza</MenuItem>
                <MenuItem value={"Alexandria"}>Alexandria</MenuItem>
                <MenuItem value={"Al Beheira"}>Al Beheira</MenuItem>
                <MenuItem value={"Al Gharbia  "}>Al Gharbia</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="mb-3">
            <FormControl fullWidth>
              <InputLabel id="return-policy-label">Return Policy</InputLabel>
              <Select
                labelId="return-policy-label"
                id="return-policy-select"
                value={""}
                onChange={handleChange}
                label="Return Policy"
              >
                <MenuItem value={"free"}>6th of October</MenuItem>
                <MenuItem value={"paid"}>Abu Rawash</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="card-body">
          <div className="row border-bottom">
            <div className="col-2">
              <IconTruckFill className="h1" />
            </div>
            <div className="col">
              <div className="ml-3">
                <span className="font-weight-bold">{t("Door Delivery")}</span>
                <p className="text-muted small">Delivery Fees EGP 260.00</p>
                <p>
                  Ready for delivery between 27 March & 30 March when you order
                  within next 2hrs 28min{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="row border-bottom py-3">
            <div className="col-2">
              <IconLifePreserverFill className="h1" />
            </div>
            <div className="col">
              <div className="ml-3">
                <span className="font-weight-bold">Return Policy</span>
                <p className="text-muted small m-0">
                  Free return within the legal return period from 14 to 30 days,
                  and if they meet the terms & conditions, with the need to
                  report any apparent defect within 48 hours. For more details
                  about return policy.Details
                </p>
              </div>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-2">
              <IconArrowCounterclockwiseFill className="h1" />
            </div>
            <div className="col">
              <div className="ml-3">
                <span className="font-weight-bold">Warranty</span>
                <p className="text-muted small m-0">
                  2 Years Manufacturer Warranty
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional div for seller information */}
      <div className="card mt-3">
        <div className="card-header font-weight-bold text-uppercase">
          Seller Information
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <p>Jumia</p>
              <hr />
              <p>100% Seller Score</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bordered-div mt-3">
        {/* Vertical Tabs */}
{/* <div className="vertical-tabs" style={{ border: '1px solid #ccc', borderRadius: '5px' }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Product Details" {...a11yProps(0)} />
            <hr className="tab-divider" />
            <Tab label="Specifications" {...a11yProps(1)} />
            <hr className="tab-divider" />
            <Tab label="Verified Customer Feedback" {...a11yProps(2)} />
          </Tabs>
        </div> */}

        {/* Tab Panels */}
        <div className="tab-panels">
          <TabPanel value={value} index={0}>
            
            {/* Product details content here */}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* Specifications content here */}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {/* Customer feedback content here */}
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default CardServices;
