"use client";
import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

type Props = {
  action: Function;
};

const Search = ({ action }: Props) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      action(inputValue);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, action]);

  return (
    <div className="w-full">
      <TextField
        sx={{
          width: "100%",
        }}
        onChange={(e) => setInputValue(e.target.value)}
        id="search-bar"
        label="Search Book Title"
        variant="outlined"
        size="small"
      />
    </div>
  );
};

export default Search;
