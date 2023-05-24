import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { WagmiConfig, createClient, goerli, mainnet } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import {
    connectkitTheme,
    darkThemePaletteOptions,
    fontThemeOptions,
} from "./theme";
import Demo from "./demo/Demo";

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
                    <Demo />
                </ConnectKitProvider>
            </ThemeProvider>
        </WagmiConfig>
    );
}

export default App;
