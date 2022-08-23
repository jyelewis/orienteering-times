import React, { useState } from "react";
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
  forceOpen?: boolean;
};

export const ResultsClass: React.FC<Props> = ({
  name,
  children,
  numberOfParticipants,
  forceOpen,
}) => {
  const [expanded, setIsExpanded] = useState<boolean>(false);

  return (
    <Accordion
      expanded={forceOpen || expanded}
      onChange={() => setIsExpanded((x) => !x)}
    >
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
