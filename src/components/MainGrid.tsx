import { Grid } from "@mui/material";
import { PropsWithChildren } from "react";

export type MainGridProps = PropsWithChildren<{}>;

function MainGrid(props: MainGridProps) {
    return (
        <Grid container spacing={2} mt={"1rem"}>
            <Grid
                item
                xs={0}
                xl={2}
                lg={1}
                display={{ sm: "none", md: "inherit" }}
            ></Grid>
            <Grid item xs={12} xl={8} lg={10}>
                {props.children}
            </Grid>
            <Grid
                item
                xs={0}
                xl={2}
                lg={1}
                display={{ sm: "none", md: "inherit" }}
            ></Grid>
        </Grid>
    );
}

export default MainGrid;
