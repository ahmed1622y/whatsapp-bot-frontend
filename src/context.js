import { createContext, useState, useEffect } from "react";
import url from "./url";
import axios from "axios";
export const AuthContext = createContext();
export const AuthProvider = (props) => {
  const [auth, setAuth] = useState([false, false, {}]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      axios
        .get(url + "/check/login", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setAuth([true, true, res.data]);
        })
        .catch((err) => {
          setAuth([true, false, {}]);
        });
    } else {
      setAuth([true, auth[1], auth[2]]);
    }
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {" "}
      {props.children}{" "}
    </AuthContext.Provider>
  );
};
