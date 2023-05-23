import {
    Box,
    CssBaseline,
    ThemeProvider,
    Typography,
    createTheme,
} from "@mui/material";
import TopBar from "./global/TopBar";
import { WagmiConfig, createClient, goerli, mainnet } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import {
    connectkitTheme,
    darkThemePaletteOptions,
    fontThemeOptions,
} from "./theme";
import MainGrid from "./components/MainGrid";
import SectionWithHeading from "./components/sections/SectionWithHeading";
import TokenAmountTextField from "./components/inputs/TokenAmountTextField";
import { useState } from "react";

const APP_NAME = "DAPP TEMPLATE";

const theme = createTheme({
    palette: darkThemePaletteOptions,
    typography: fontThemeOptions,
});

function App() {
    const anvil = Object.assign(
        {},
        { ...mainnet },
        {
            id: 1337,
            name: "Localhost",
            network: "anvil",
            rpcUrls: {
                default: { http: ["http://localhost:8545"] },
            },
        }
    );

    const client = createClient(
        getDefaultClient({
            appName: APP_NAME,
            chains:
                process.env.NODE_ENV === "development"
                    ? [anvil]
                    : [mainnet, goerli],
        })
    );

    const [parsedValue, setParsedValue] = useState<string | null>(null);

    function onValueChange(value: string | null) {
        setParsedValue(value);
    }

    return (
        <WagmiConfig client={client}>
            <ThemeProvider theme={theme}>
                <ConnectKitProvider customTheme={connectkitTheme}>
                    <CssBaseline />
                    <div className="app">
                        <main className="content">
                            <TopBar></TopBar>
                            <MainGrid>
                                <SectionWithHeading heading="Test">
                                    <Box p={1}>
                                        <Box mb={"1rem"}>
                                            This is a Section component with a
                                            heading.
                                        </Box>
                                        <Box>
                                            <Typography variant="h6">
                                                Parsed Value: {parsedValue}
                                            </Typography>
                                            <TokenAmountTextField
                                                variant="outlined"
                                                value="0.0"
                                                tokenDecimals={18}
                                                tokenSymbol="DAI"
                                                onValueChange={onValueChange}
                                                InputProps={{
                                                    endAdornment: "DAI",
                                                }}
                                            ></TokenAmountTextField>
                                        </Box>
                                    </Box>
                                </SectionWithHeading>
                            </MainGrid>
                        </main>
                    </div>
                </ConnectKitProvider>
            </ThemeProvider>
        </WagmiConfig>
    );
}

export default App;
