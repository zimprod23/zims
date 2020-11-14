import React, { useEffect } from "react";
import "./App.css";
import "./index.css";
import "antd/dist/antd.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import SignInSide from "./components/views/LoginPage/Login";
import LandingPage from "./components/views/LandingPage/LandingPage";
import SearchAppBar from "./components/views/AppBar/AppBar";
import SignUp from "./components/views/RegisterPage/Register";
import Auth from "./hoc/hocAuth";
import ProductDtail from "./components/views/ProductDetailPage/ProductDetails";
import CartPage from "./components/views/CartPage/CartePage";
import EmailVerification from "./components/views/RegisterPage/EmailVerification";
import AdminPage from "./Admin/AdminComponents/Dashboard";
import { ToogleProvider } from "./components/views/CartPage/ToogleState";
import { AdminOpsProvider } from "./components/utils/AdminOptionsProvider";
import Footer from "./components/views/Footer/Footer";
import UserDashBoard from "./user/userComponent/Dashboard/DashBorad";
import EmailVer from "./components/views/RegisterPage/InformVerification";
import ForgotPass from "./components/views/LoginPage/ForgotPasswordFS";

function App() {
  let fullPath = window.location.href;
  let targetPath = fullPath.substring(fullPath.length - 27, fullPath.length);
  //  let signinup = fullPath.substring(fullPath.length - 7, fullPath.length);
  let usrDashboard = fullPath.substring(fullPath.length - 10, fullPath.length);
  // useEffect(() => {
  //   // targetPath = fullPath.substring(fullPath.length - 6, fullPath.length);
  //   // signinup = fullPath.substring(fullPath.length - 7, fullPath.length);
  //   // usrDashboard = fullPath.substring(fullPath.length - 10, fullPath.length);
  //   console.log("Path changed");
  // }, [fullPath]);
  return (
    <ToogleProvider>
      <Router>
        {targetPath == "/admin_private_dashBoard123" ? null : (
          <>
            <SearchAppBar />
            <br />
            <br />
            <br />
          </>
        )}
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/signin" component={Auth(SignInSide, false)} />
          <Route exact path="/signup" component={Auth(SignUp, false)} />

          {/* <Route exact path="/test" component={Auth(Test, false)} /> */}
          <Route exact path="/user/cart" component={Auth(CartPage, true)} />

          <Route
            exact
            path="/user/activateAccount"
            component={Auth(EmailVerification, false)}
          />
          <Route
            exact
            path="/user/dashboard"
            component={Auth(UserDashBoard, true)}
          />
          <Route
            exact
            path="/product/:productId"
            component={Auth(ProductDtail, null)}
          />
          <Route
            exact
            path="/emailVerification"
            component={Auth(EmailVer, false)}
          />
          <Route
            exact
            path="/user/PasswordReset"
            component={Auth(ForgotPass, false)}
          />
          <AdminOpsProvider>
            <Route
              exact
              path="/admin_private_dashBoard123"
              component={Auth(AdminPage, true, true)}
            />
          </AdminOpsProvider>
        </Switch>
        {targetPath == "/admin" ? null : usrDashboard == "/dashboard" ? null : (
          <Footer />
        )}
      </Router>
    </ToogleProvider>
  );
}

export default App;
