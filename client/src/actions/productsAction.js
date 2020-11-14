import {
  PRODUCTS_LOADED,
  PRODUCTS_LOADING,
  SPPRODUCTS_LOADED,
  SPPRODUCTS_LOADING,
  TRENDING_PRODUCT_LOADED,
  TRENDING_PRODUCT_LOADING,
  SAVE_PRODUCT,
  UNSAVE_PRODUCT,
  PRODUCT_BYCAT_LOADED,
  SELLED_PRODUCT_LOADED,
  SAVED_PRODUCT_LOADED,
  SAVED_PRODUCT_LOADING,
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authAction";

export const getAllProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCTS_LOADING,
  });
  await axios.get("/api/product/getallproduct").then((res) => {
    dispatch({
      type: PRODUCTS_LOADED,
      payload: res.data,
    });
  });
};

export const hitLoveProduct = (id, save) => async (dispatch) => {
  if (save === true) {
    save = "save";
  } else {
    save = "unsave";
  }
  await axios
    .get(`/api/user/saveProduct?productId=${id}&save=${save}`, tokenConfig())
    .then((res) => {
      if (save == "save")
        dispatch({
          type: SAVE_PRODUCT,
          payload: res.data,
        });
      if (save == "unsave")
        dispatch({
          type: UNSAVE_PRODUCT,
          payload: res.data,
        });
      console.log(res.data);
    });
  // .catch((err) => {
  //   alert("Cannot save product");
  // });
};

export const sendFeedBack = (infos, productId) => async () => {
  infos = JSON.stringify(infos);
  console.log(infos);
  await axios
    .post(
      `/api/product/productfeedback?productId=${productId}`,
      infos,
      tokenConfig()
    )
    .then((res) => {
      console.log(res.data);
    });
};

export const addProduct = (dataToSend) => async (dipatch) => {
  dataToSend = JSON.stringify(dataToSend);

  alert(dataToSend);
  await axios
    .post("/api/product/addproduct", dataToSend, config)
    .then((res) => {
      console.log(res.data);
    });
};

export const promoteProduct = (id, promotion) => async (dispatch) => {
  promotion = JSON.stringify(promotion);

  await axios
    .patch("/api/product/promoteproduct", promotion, config)
    .then((res) => {
      console.log(res.data);
    });
  // .catch((err) => {
  //   alert("Cannot upload product");
  // });
};

export const config = {
  headers: {
    "Content-type": "application/json",
  },
};

export const getTrendingProducts = () => async (dispatch) => {
  dispatch({
    type: TRENDING_PRODUCT_LOADING,
  });
  await axios.get("/api/product/getTopHeadlines", config).then((res) => {
    dispatch({
      type: TRENDING_PRODUCT_LOADED,
      payload: res.data,
    });
  });
};

export const getSimularProducts = (productId) => async (dispatch) => {
  dispatch({
    type: SPPRODUCTS_LOADING,
  });
  await axios
    .get(`/api/product/simularProduct?productId=${productId}`)
    .then((res) => {
      dispatch({
        type: SPPRODUCTS_LOADED,
        payload: res.data,
      });
    });
};
export const productBycat = (cat) => async (dispatch) => {
  dispatch({
    type: PRODUCTS_LOADING,
  });
  await axios.get(`/api/product/productbycat?cat=${cat}`).then((res) => {
    dispatch({
      type: PRODUCT_BYCAT_LOADED,
      payload: res.data,
    });
  });
};
export const getSelledProductInfo = (productId) => async (dispatch) => {
  await axios
    .get(`/api/product/selledProducts?productId=${productId}`)
    .then((res) => {
      dispatch({
        type: SELLED_PRODUCT_LOADED,
        payload: res.data,
      });
    });
};

export const getSavedProducts = () => async (dispatch) => {
  dispatch({
    type: SAVED_PRODUCT_LOADING,
  });
  await axios.get("/api/user/getSavedProducts", tokenConfig()).then((res) => {
    dispatch({
      type: SAVED_PRODUCT_LOADED,
      payload: res.data.savedProducts,
    });
  });
};
