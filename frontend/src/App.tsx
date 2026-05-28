import { Route , Routes } from "react-router-dom";
import HomePage  from "./pages/home/HomePage";
import  AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/chat/ChatPage";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/404/NotFoundPage";

function App() {

  return (
     <>
      <Routes>

        {/* if we go to this path , this page / route will open */}


        
        <Route path="/sso-callback" 
        element={<AuthenticateWithRedirectCallback  signUpForceRedirectUrl = {"/auth-callback"}/>} 
        
        />
        {/* once user sign up redirect them to authpage */}
        <Route path = "/auth-callback" element = {<AuthCallbackPage/>}/>
        <Route path = "/admin" element = {<AdminPage/>}/>

        {/* it has three componenets - left main right , left and right stay same only main one changes page wise */}
        {/* admin route/layout should be above the main layout as we do not want the admin page to have main layout */}

        <Route element = {<MainLayout/>}>
          <Route path = "/" element = {<HomePage/>}/>
          <Route path = "/chat" element = {<ChatPage/>}/>
          <Route path = "/albums/:albumId" element = {<AlbumPage/>}/>
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>

      <Toaster /> 
      {/* keep it outside the routes */}
    </>
    
  )
}

export default App
