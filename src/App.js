import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import ConnectedRoverSearch, {
  reducer as storeReducer
} from "./pages/ConnectedRoverSearch";
import promise from "redux-promise-middleware";

const finalCreateStore = compose(
  applyMiddleware(promise),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);
const store = finalCreateStore(storeReducer);

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRoverSearch />
    </Provider>
  );
};

export default App;
