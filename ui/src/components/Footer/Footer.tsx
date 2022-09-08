import { Box } from "@mui/material";
import React from "react";
import Logo from "../../assets/logo.png";
import { COLOR_YELLOW } from "../../colors";

export const Footer: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50px",
          width: "100%",
          backgroundImage: `url('${Logo}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center bottom",
          backgroundColor: COLOR_YELLOW,
          zIndex: 999,
        }}
      ></Box>
      {/*Spacer*/}
      <Box
        sx={{
          height: "50px",
        }}
      ></Box>
    </>
  );
};
