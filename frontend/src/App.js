import "./App.css"
import { RouterProvider } from "react-router-dom";
import { router } from "./router.js";
import { Provider } from "react-redux";
import store from "./store/index.js";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
