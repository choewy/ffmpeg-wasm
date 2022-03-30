import { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { userAuthAction } from "../actions/user.actions";
import AuthRoute from "./commons/AuthRoute";
import Navbar from "./commons/Navbar";
import ChatPage from "./pages/ChatPage/ChatPage";
import LandingPage from "./pages/LandingPage";
import RoomPage from "./pages/RoomPage/RoomPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";


interface AppUser {
  _id: string,
  auth: boolean | null,
  name: string,
  email: string,
  role: boolean
};

const AppUserInit: AppUser = {
  _id: '',
  auth: null,
  name: '',
  email: '',
  role: false
};

const App = () => {
  const [appUser, setAppUser] = useState({...AppUserInit});

  const userAuthCheck = async () => {
    const user = await userAuthAction();
    setAppUser({...user});
  };

  useEffect(() => {
    userAuthCheck();
    return () => {};
}, []);

  if (appUser.auth === null) return <></>

  return (
    <Suspense fallback={<>Loading...</>}>
      <Navbar user={appUser} userAuthCheck={userAuthCheck}/>
      <Routes>
        <Route path ="/" element={<LandingPage />} />
        <Route path="/signup" element={
          <AuthRoute 
            Component={SignupPage} 
            user={appUser} 
            userAuthCheck={userAuthCheck}
            reverse={true}
          />
        }/>
        <Route path="/signin" element={
          <AuthRoute 
            Component={SigninPage}
            user={appUser}
            userAuthCheck={userAuthCheck}
            reverse={true}/>
        }/>
        <Route path="/rooms" >
          <Route path="" element={
            <AuthRoute 
              Component={RoomPage} 
              user={appUser}
              userAuthCheck={userAuthCheck}
              reverse={false}/>
            } />
          <Route path=":_id" element={
            <AuthRoute 
              Component={ChatPage} 
              user={appUser}
              userAuthCheck={userAuthCheck}
              reverse={false}/>
            } />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;