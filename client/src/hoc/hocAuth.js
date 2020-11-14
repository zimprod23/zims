import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAuth } from "../actions/authAction";

export default function (ComposedClass, reload, AdminRoute = null) {
  function AuthentificationChech(props) {
    let auth = useSelector((state) => state.auth);
    let user = auth.user;
    let isAuth = auth.isAuth;
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(userAuth())
        .then((result) => {
          if (isAuth) {
            if (AdminRoute && !user.isAdmin) {
              props.history.push("/");
            }
          }
        })
        .catch((err) => {
          if (reload) props.history.push("/signin");
        });
    }, [dispatch, props.history, isAuth]);
    return <ComposedClass {...props} user={user} />;
  }
  return AuthentificationChech;
}
