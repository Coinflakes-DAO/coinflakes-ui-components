import {
    Box,
    Button,
    CssBaseline,
    ThemeProvider,
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
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit. Nullam
                                            eget felis eget nunc aliquet
                                            ultricies. Donec euismod, nisl vitae
                                            aliquam ultricies, nunc sapien
                                            ultricies nunc, vitae aliquam nunc
                                            nisl vitae nunc.
                                        </Box>
                                        <Box mb={"1rem"}>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                sx={{ mr: "1rem" }}
                                            >
                                                Primary
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                            >
                                                Primary
                                            </Button>
                                        </Box>
                                        <Box>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                sx={{ mr: "1rem" }}
                                            >
                                                Secondary
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                            >
                                                Secondary
                                            </Button>
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
