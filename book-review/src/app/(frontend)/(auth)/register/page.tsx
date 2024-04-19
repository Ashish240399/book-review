import React from "react";
import RegisterPage from "./RegisterPage";
import { Metadata } from "next";

type Props = {};
export const metadata: Metadata = {
  title: "Register Page",
  description: "Simaple Register Page for Book Review Application",
};
const Register = (props: Props) => {
  return (
    <div>
      <RegisterPage />
    </div>
  );
};

export default Register;
