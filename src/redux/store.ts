import { compose, createStore } from "redux";

import reducers from "./reducers";

// Extending the Window interface to include the __REDUX_DEVTOOLS_EXTENSION__ property
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
    }
}

const store = createStore(
    reducers,
    {},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;