import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { camelCase } from "@/util/format";

/*
  The contents of this file is taked from "https://mui.com/material-ui/react-accordion/"".
  Much is unchanged as the code is complex
*/
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&:before": {
        display: "none",
    },
}));

/*
  The contents of this file is taked from "https://mui.com/material-ui/react-accordion/"".
  Much is unchanged as the code is complex
*/
const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, .05)"
            : "rgba(100, 145, 220, .20)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
    },
}));

/*
  The contents of this file is taked from "https://mui.com/material-ui/react-accordion/"".
  Much is unchanged as the code is complex
*/
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

/*
  A collapsable menu component. Unused in the current program state but is left
  in for future versions. 
*/
export default function CollapsableMenu({ title, labels }) {
    const [expanded, setExpanded] = React.useState(true);

    const handleChange = () => {
        setExpanded(!expanded)
    };

    return (
        <div>
            <Accordion
                expanded={expanded}
                onChange={() => handleChange()}
            >
                <AccordionSummary id="panel1d-header">
                    <Typography>{camelCase(title)}</Typography>
                </AccordionSummary>
                {labels.map(item => (
                    <AccordionDetails key={item}>
                        <Typography>{camelCase(item)}</Typography>
                    </AccordionDetails>
                ))}
            </Accordion>
        </div>
    );
}