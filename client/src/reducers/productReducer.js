import {
  PRODUCTS_FETCHED,
  PRODUCTS_LOADING,
  PRODUCTS_LOADED,
  TRENDING_PRODUCT_LOADED,
  TRENDING_PRODUCT_LOADING,
  SPPRODUCTS_LOADING,
  SPPRODUCTS_LOADED,
  SEARCH_PRODUCT_LOADED,
  SEARCH_PRODUCT_LOADING,
  PRODUCT_BYCAT_LOADED,
  SELLED_PRODUCT_LOADED,
  SAVED_PRODUCT_LOADED,
  SAVED_PRODUCT_LOADING,
} from "../actions/types";

const initialState = {
  productsLoading: false,
  productsLoaded: false,
  trendingProductsLoading: false,
  trendingProductsLoaded: false,
  products: null,
  speceficProduct: null,
  trendingProduct: null,
  searchProducts: null,
  searchProductLoading: false,
  searchProductLoaded: false,
  selledProduct: null,
  savedProducts: null,
  savedProductsLoading: false,
  savedProductsLoaded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PRODUCTS_LOADING:
      return {
        ...state,
        productsLoading: true,
        productsLoaded: false,
      };
    case PRODUCTS_LOADED:
    case PRODUCT_BYCAT_LOADED:
      return {
        ...state,
        productsLoaded: true,
        productsLoading: false,
        products: action.payload,
      };
    case SPPRODUCTS_LOADING:
      return {
        ...state,
        productsLoading: true,
        productsLoaded: false,
      };
    case SPPRODUCTS_LOADED:
      return {
        ...state,
        productsLoaded: true,
        productsLoading: false,
        speceficProduct: action.payload,
      };
    case TRENDING_PRODUCT_LOADING:
      return {
        ...state,
        trendingProductsLoaded: false,
        trendingProductsLoading: true,
      };
    case TRENDING_PRODUCT_LOADED:
      return {
        ...state,
        trendingProductsLoaded: true,
        trendingProductsLoading: false,
        trendingProduct: action.payload,
      };
    case SEARCH_PRODUCT_LOADING:
      return {
        ...state,
        searchProductLoading: true,
        searchProductLoaded: false,
      };
    case SEARCH_PRODUCT_LOADED:
      return {
        ...state,
        searchProductLoading: false,
        searchProductLoaded: true,
        searchProducts: action.payload,
      };
    case SELLED_PRODUCT_LOADED:
      return {
        ...state,
        selledProduct: action.payload,
      };
    case SAVED_PRODUCT_LOADING:
      return {
        ...state,
        savedProductsLoading: true,
        savedProductsLoaded: false,
      };
    case SAVED_PRODUCT_LOADED:
      return {
        ...state,
        savedProductsLoading: false,
        savedProductsLoaded: true,
        savedProducts: action.payload,
      };
    default:
      return state;
  }
}
