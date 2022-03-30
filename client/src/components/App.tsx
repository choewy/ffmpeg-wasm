import { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { userAuthAction } from "../actions/user.actions";
import AuthRoute from "./commons/AuthRoute";
import Navbar from "./commons/Navbar";
import ChatPage from "./pages/ChatPage";
import LandingPage from "./pages/LandingPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";

const App = () => {
  const [appstate, setAppState] = useState({
    user: {
      auth: null,
      name: '',
      email: '',
      role: false
    }
  });

  useEffect(() => {
    const userAuthCheck = async () => {
      const user = await userAuthAction();
      setAppState({...appstate, user});
    };
    userAuthCheck();
    return () => {};
}, [appstate]);

  if (appstate.user.auth === null) return <></>

  return (
    <Suspense fallback={<>Loading...</>}>
      <Navbar user={appstate.user}/>
      <Routes>
        <Route path ="/" element={<LandingPage />} />
        <Route path="/signup" element={
          <AuthRoute Component={SignupPage} user={appstate.user} reverse={true}/>
        }/>
        <Route path="/signin" element={
          <AuthRoute Component={SigninPage} user={appstate.user} reverse={true}/>
        }/>
        <Route path="/chat" element={
          <AuthRoute Component={ChatPage} user={appstate.user} reverse={false}/>
        }/>
      </Routes>
    </Suspense>
  );
};

export default App;