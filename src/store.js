import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

const store = createStore(composeEnhancer(applyMiddleware(thunk)));

export default store;
export const baseURL = "https://simple-contact-crud.herokuapp.com";
export const noImage =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";
