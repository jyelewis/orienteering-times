import React from "react";
import { Box } from "@mui/material";
import { COLOR_GREY } from "../../colors";

export type Props = {
  children?: React.ReactElement;
};

export const Header: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Box
        sx={{
          height: "50px",
          backgroundColor: COLOR_GREY,
          borderBottom: "1px solid #bbb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "20px",
          padding: "0 20px",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99,
        }}
      >
        {children}
      </Box>
      {/*Spacer*/}
      <Box
        sx={{
          height: "50px",
        }}
      ></Box>
    </>
  );
};
