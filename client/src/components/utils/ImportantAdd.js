import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useDispatch } from "react-redux";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import {
  Computer,
  PhoneAndroid,
  Watch,
  Stars,
  Devices,
  Apple,
  Kitchen,
  Favorite,
  Book,
  GroupWork,
  LocalOffer,
} from "@material-ui/icons";
import { productBycat, getAllProducts } from "../../actions/productsAction";
// import Collapse from "@material-ui/core/Collapse";
// import ExpandLess from "@material-ui/icons/ExpandLess";
// import ExpandMore from "@material-ui/icons/ExpandMore";
// import StarBorder from "@material-ui/icons/StarBorder";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    //maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  containerxx: {
    padding: "7px",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [cat, setcat] = useState("");
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  useEffect(() => {
    if (cat !== "") {
      if (cat === "All") {
        dispatch(getAllProducts());
      } else {
        dispatch(productBycat(cat));
      }
    }
    return () => {
      setcat("");
    };
  }, [cat]);

  const handleClick = () => {
    setOpen(!open);
  };

  let p = [
    {
      name: "Computers",
      index: 1,
    },
    {
      name: "Phones",
      index: 2,
    },
    {
      name: "Apple",
      index: 3,
    },
    {
      name: "Watches",
      index: 4,
    },
    {
      name: "Kitchen",
      index: 5,
    },
    {
      name: "Accessories",
      index: 6,
    },
    {
      name: "Masterpieces",
      index: 7,
    },
    {
      name: "Clothing",
      index: 8,
    },
  ];
  return (
    <div className={classes.containerxx}>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Categories
          </ListSubheader>
        }
        className={classes.root}
      >
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={(event) => {
            handleListItemClick(event, 1);
            setcat("All");
          }}
        >
          <ListItemIcon>
            <GroupWork />
          </ListItemIcon>
          <ListItemText primary="All" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={(event) => {
            handleListItemClick(event, 2);
            setcat("Computers");
          }}
        >
          <ListItemIcon>
            <Computer />
          </ListItemIcon>
          <ListItemText primary="Computers and laptops" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 3}
          onClick={(event) => {
            handleListItemClick(event, 3);
            setcat("Phones");
          }}
        >
          <ListItemIcon>
            <PhoneAndroid />
          </ListItemIcon>
          <ListItemText primary="phones" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 4}
          onClick={(event) => {
            handleListItemClick(event, 4);
            setcat("Apple");
          }}
        >
          <ListItemIcon>
            <Apple />
          </ListItemIcon>
          <ListItemText primary="Apple products" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 5}
          onClick={(event) => {
            handleListItemClick(event, 5);
            setcat("Watches");
          }}
        >
          <ListItemIcon>
            <Watch />
          </ListItemIcon>
          <ListItemText primary="Watches" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 6}
          onClick={(event) => {
            handleListItemClick(event, 6);
            setcat("Kitchen");
          }}
        >
          <ListItemIcon>
            <Kitchen />
          </ListItemIcon>
          <ListItemText primary="Kitchen" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 7}
          onClick={(event) => {
            handleListItemClick(event, 7);
            setcat("Accessories");
          }}
        >
          <ListItemIcon>
            <Devices />
          </ListItemIcon>
          <ListItemText primary="Phones and pc accessories" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 8}
          onClick={(event) => {
            handleListItemClick(event, 8);
            setcat("Masterpieces");
          }}
        >
          <ListItemIcon>
            <Favorite />
          </ListItemIcon>
          <ListItemText primary="Masterpiece" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 9}
          onClick={(event) => {
            handleListItemClick(event, 9);
            setcat("Clothing");
          }}
        >
          <ListItemIcon>
            <LocalOffer />
          </ListItemIcon>
          <ListItemText primary="Clothing" />
        </ListItem>
      </List>
    </div>
  );
}
/**
 * <Collapse in={open} timeout="auto" unmountOnExit>
 */
