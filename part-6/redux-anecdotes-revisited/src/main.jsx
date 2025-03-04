import ReactDOM from "react-dom/client";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import AnecdotesReducer from "./reducers/anecdoteReducer";
import { filterReducer } from "./reducers/filterReducer";

const reducer = combineReducers({
    anecdotes: AnecdotesReducer,
    filter: filterReducer,
});

const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);
