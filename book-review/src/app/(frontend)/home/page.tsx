import React from "react";
import HomePage from "./HomePage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home Page",
  description: "Book Review Application",
};
const Home = async () => {
  return (
    <div className="h-[100%] overflow-auto">
      <HomePage />
    </div>
  );
};

export default Home;
