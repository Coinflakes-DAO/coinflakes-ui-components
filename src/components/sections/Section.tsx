import { Box, useTheme } from "@mui/material";
import React from "react";

export type SectionProps = React.PropsWithChildren<{}>;

export function Section(props: SectionProps) {
    const theme = useTheme();
    return (
        <Box
            bgcolor={theme.palette.background.paper}
            borderColor={theme.palette.primary.main}
            border={"1px solid " + theme.palette.divider}
            borderRadius={"0.4rem"}
            p={2}
            ml={"2rem"}
            mr={"2rem"}
        >
            {props.children}
        </Box>
    );
}
