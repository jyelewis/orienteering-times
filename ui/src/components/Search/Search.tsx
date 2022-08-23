import React from "react";
import { TextField } from "@mui/material";

export type Props = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

export const Search: React.FC<Props> = ({ searchText, setSearchText }) => {
  return (
    <TextField
      required
      label="Search"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      fullWidth
    />
  );
};
