import { Box } from "@mui/material";
import { styled } from "@mui/system";

//reuse css as a styled component

const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
});

export default FlexBetween;