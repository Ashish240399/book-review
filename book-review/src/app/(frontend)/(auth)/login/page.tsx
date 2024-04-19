import React from "react";
import LoginPage from "./LoginPage";
import { Metadata } from "next";

type Props = {};
export const metadata: Metadata = {
  title: "Login Page",
  description: "Simaple Login Page for Book Review Application",
};
const Login = (props: Props) => {
  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default Login;
