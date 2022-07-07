import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context";
import { Login } from "./login";
import { Data } from "./data";
import { Bot } from "./bot";
function App() {
  const [auth] = useContext(AuthContext);
  console.log(auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={auth[0] ? auth[1] ? <Bot /> : <Login /> : <></>}
        />
        <Route
          path="/data"
          element={auth[0] ? auth[1] ? <Data /> : <Login /> : <></>}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
