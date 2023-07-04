import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import AuthProvider from "./auth/auth-provider.tsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="187986590144-se6ilugp0r9dn8tqj5hd5rnphvl4v0t7.apps.googleusercontent.com">
        <AuthProvider>
          <App />
        </AuthProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
