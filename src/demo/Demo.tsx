import { Box, Grid, Link } from "@mui/material";
import MainGrid from "../components/MainGrid";
import TopBar from "../global/TopBar";
import TokenAmountTextFieldDemo from "./TokenAmountTextFieldDemo";

import { RouterProvider, createHashRouter } from "react-router-dom";

const demoRouter = createHashRouter([
    {
        path: "/",
        Component: TokenAmountTextFieldDemo,
    },
]);

function Demo() {
    return (
        <div className="app">
            <main className="content">
                <TopBar></TopBar>
                <MainGrid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Box p={"1rem"}>
                                <Link variant={"h5"} href="/">
                                    Token Amount Input Field
                                </Link>{" "}
                                |{" "}
                                <Link
                                    variant={"h5"}
                                    href="/#token-approval-button"
                                >
                                    Token Approval Button
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <RouterProvider router={demoRouter} />;
                        </Grid>
                    </Grid>
                </MainGrid>
            </main>
        </div>
    );
}

export default Demo;
