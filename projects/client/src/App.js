import axios from "axios";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import UserLanding from "./pages/UserLanding";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signin from "./pages/Signin";
import Verify from "./pages/verify";
import "./style/main.css"
import UserAuth from "./userAuth";
function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/greetings`
  //     );
  //     setMessage(data?.message || "");
  //   })();
  // }, []);
  return (
    <>
    <UserAuth>
    <Routes>
      <Route path="/" element={<UserLanding />}/>
      <Route path="/shop" element={<Shop />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/contact" element={<Contact />}/>
      <Route path="/signin" element={<Signin/>}/>
    </Routes>
    </UserAuth>
    </>
  );
}

export default App;
