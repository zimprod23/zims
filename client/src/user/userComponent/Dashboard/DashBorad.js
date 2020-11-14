import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FavoriteIcon from "@material-ui/icons/Favorite";

import Box from "@material-ui/core/Box";
import Report from "../Report/Report";
import SavedProds from "../saved/SavedProducts";
import { Settings, Warning, History } from "@material-ui/icons";
import HistoryPage from "../History/History";
import UserSettings from "../UserStetting/UserSettingDashboard";
import { useSelector } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        // <Box p={3}>
        //   <Typography>{children}</Typography>
        // </Box>
        <Box p={7}>{children}</Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function DashBoard(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          centered
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab
            label="Report"
            icon={<Warning color="secondary" />}
            {...a11yProps(0)}
          />
          <Tab label="Saved" icon={<FavoriteIcon />} {...a11yProps(1)} />
          <Tab label="Settings" icon={<Settings />} {...a11yProps(2)} />
          <Tab label="History" icon={<History />} {...a11yProps(3)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Report />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SavedProds />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UserSettings />
      </TabPanel>
      <TabPanel value={value} index={3}>
        {props.user && <HistoryPage user={props.user.user} />}
      </TabPanel>
    </div>
  );
}
