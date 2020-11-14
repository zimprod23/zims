import React, { useContext } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Email, CloudUpload, Warning, Assessment } from "@material-ui/icons";
import { AdminOps } from "../../components/utils/AdminOptionsProvider";

export const MainListItems = () => {
  const { tab } = useContext(AdminOps);
  const [ToogleTab, setToogleTab] = tab;

  console.log(ToogleTab);
  return (
    <div>
      <ListItem button onClick={() => setToogleTab({ home: true })}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => setToogleTab({ finish: true })}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItem>
      <ListItem button onClick={() => setToogleTab({ email: true })}>
        <ListItemIcon>
          <Email />
        </ListItemIcon>
        <ListItemText primary="Send Email" />
      </ListItem>
      <ListItem button onClick={() => setToogleTab({ report: true })}>
        <ListItemIcon>
          <Warning />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
      <ListItem button onClick={() => setToogleTab({ upload: true })}>
        <ListItemIcon>
          <CloudUpload />
        </ListItemIcon>
        <ListItemText primary="Upload Product" />
      </ListItem>
      <ListItem button onClick={() => setToogleTab({ follow: true })}>
        <ListItemIcon>
          <Assessment />
        </ListItemIcon>
        <ListItemText primary="Manage Product" />
      </ListItem>
    </div>
  );
};

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
