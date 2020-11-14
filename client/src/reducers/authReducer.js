import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  GET_USERS,
  SAVE_PRODUCT,
  UNSAVE_PRODUCT,
  ADD_TO_CARD,
  GET_CARD_ITEMS,
  REMOVE_CARD_ITEM,
  ON_SUCCESS_BUY,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuth: false,
  isLoading: false,
  user: null,
  users: null,
  cartDetail: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuth: true,
        user: action.payload,
        isLoading: false,
      };
    case LOGIN_SUCCESS:
      //case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        user: action.payload.user,
        isAuth: true,
        isLoading: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        user: null,
        isAuth: false,
        isLoading: false,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        ...action.payload,
        token: null,
        isAuth: false,
        isLoading: false,
        user: null,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SAVE_PRODUCT:
      return {
        ...state,
        user: {
          ...state.user,
          user: {
            ...state.user.user,
            saved: [...state.user.user.saved, action.payload],
          },
        },
      };
    case UNSAVE_PRODUCT:
      return {
        ...state,
        user: {
          ...state.user,
          user: {
            ...state.user.user,
            saved: state.user.user.saved.filter(
              (item) => item.productId != action.payload.productId
            ),
          },
        },
      };
    case ADD_TO_CARD:
      return {
        ...state,
        user: {
          ...state.user,
          user: {
            ...state.user.user,
            cart: action.payload.cart,
          },
        },
      };
    case GET_CARD_ITEMS:
      return {
        ...state,
        cartDetail: action.payload,
      };
    case REMOVE_CARD_ITEM:
      return {
        ...state,
        cartDetail: action.payload.cartDetail,
        user: {
          ...state.user,
          user: {
            ...state.user.user,
            cart: action.payload.cart,
          },
        },
      };
    case ON_SUCCESS_BUY:
      return {
        ...state,
        cartDetail: action.payload.cartDetail,
        user: {
          ...state.user,
          user: {
            ...state.user.user,
            cart: action.payload.cart,
          },
        },
      };
    default:
      return state;
  }
}
