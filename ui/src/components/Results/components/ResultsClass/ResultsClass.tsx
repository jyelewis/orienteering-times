import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export type Props = {
  name: string;
  numberOfParticipants: number;
  children: React.ReactElement;
};

// TODO: can this component be deleted?

export const ResultsClass: React.FC<Props> = ({
  name,
  children,
  numberOfParticipants,
}) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {name}
        <Badge
          badgeContent={numberOfParticipants}
          color="primary"
          sx={{ position: "relative", top: 10, left: 20 }}
        />
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
