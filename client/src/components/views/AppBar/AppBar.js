import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import PropTypes from "prop-types";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { ExitToApp, ShoppingCart, VpnKey } from "@material-ui/icons";
import AccountCircle from "@material-ui/icons/AccountCircle";

import NotificationsIcon from "@material-ui/icons/Notifications";

import Logo from "./zim2.PNG";
import Axios from "axios";
import SearchSugg from "./section/SearchSuggestions";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  colorPrimary: {
    BackgroundColor: "#56e2fb",
    marginBottom: "100px",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  logo: {
    maxWidth: "3.5em",
    borderRadius: "10px",
  },
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const [searchKey, setsearchKey] = useState("");
  const [suggestedProduct, setsuggestedProduct] = useState(null);
  const [cartCount, setcartCount] = useState(0);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    auth && auth.user && auth.user.user && auth.user.user.cart
      ? setcartCount(auth.user.user.cart.length)
      : setcartCount(0);
  }, [auth.user]);
  useEffect(() => {
    Axios.get(`/api/product/searchproduct?term=${searchKey}`).then((res) => {
      console.log(res.data.products);
      setsuggestedProduct(res.data);
    });
  }, [searchKey]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [anchorE2, setAnchorE2] = React.useState(null);

  const handleSearchBarChange = (e) => {
    setsearchKey(e.target.value);
    if (searchKey.length > 0) {
      console.log("sup");
      setAnchorE2(e.currentTarget);
    } else {
      setAnchorE2(null);
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    window.location.replace("/user/dashboard");
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {auth && auth.isAuth ? (
        <>
          {/* <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Messages</p>
          </MenuItem> */}
          <MenuItem
            onClick={() => {
              window.location.replace("/user/cart");
            }}
          >
            <IconButton aria-label="Shopping cart" color="inherit">
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <p>Shopping Cart</p>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            <IconButton
              aria-label="logout"
              aria-controls="primary-search-logout-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <ExitToApp />
            </IconButton>
            <p>logout</p>
          </MenuItem>
        </>
      ) : (
        <>
          <Link to={`/signin`} style={{ color: "black" }}>
            <MenuItem>
              <IconButton
                aria-label="logout"
                aria-controls="primary-search-logout-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <VpnKey />
              </IconButton>
              <p>signin</p>
            </MenuItem>
          </Link>
        </>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar /*position="static"*/ className={classes.colorPrimary}>
          <Toolbar>
            <Link to={`/`}>
              <img src={Logo} className={classes.logo} />
            </Link>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>

              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                value={searchKey}
                onChange={handleSearchBarChange}
              />
            </div>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {auth && auth.isAuth ? (
                <>
                  {/* <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton> */}
                  <IconButton
                    aria-label="show 17 new notifications"
                    color="inherit"
                    onClick={() => {
                      window.location.replace("/user/cart");
                    }}
                  >
                    <Badge badgeContent={cartCount} color="secondary">
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <IconButton
                    aria-label="show 17 new notifications"
                    color="inherit"
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.reload();
                    }}
                  >
                    <ExitToApp />
                  </IconButton>
                </>
              ) : (
                <>
                  <Link to={`/signin`} style={{ color: "white" }}>
                    <IconButton
                      aria-label="show 4 signIn"
                      color="inherit"
                      size="small"
                    >
                      Sign in
                    </IconButton>{" "}
                  </Link>
                </>
              )}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {renderMobileMenu}
      {/* {renderMenu} */}
      {suggestedProduct && suggestedProduct.products.length > 0 && (
        <SearchSugg suggestedProduct={suggestedProduct} />
      )}
    </div>
  );
}
