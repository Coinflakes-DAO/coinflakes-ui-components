import React from "react";
import { Section, SectionProps } from "./Section";
import { Box, Divider, Typography } from "@mui/material";

export type SectionWithHeadingProps = SectionProps & {
    heading: string | React.ReactNode;
};

function SectionWithHeading(props: SectionWithHeadingProps) {
    const heading: React.ReactNode =
        typeof props.heading === "string" ? (
            <Typography variant="h4">{props.heading}</Typography>
        ) : (
            props.heading
        );
    return (
        <Section>
            <Box mb={"1rem"}>{heading}</Box>
            <Divider variant="fullWidth" light />
            <Box mt={"0rem"} p={1}>
                {props.children}
            </Box>
        </Section>
    );
}

export default SectionWithHeading;
