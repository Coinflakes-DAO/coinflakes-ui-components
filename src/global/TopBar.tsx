import { Box, useTheme } from "@mui/material";
import { ConnectKitButton } from "connectkit";

function TopBar() {
    const theme = useTheme();
    return (
        <Box display={"flex"} justifyContent={"space-between"} p={2}>
            <Box display={"flex"} alignItems={"center"}>
                LOGO
            </Box>
            <Box display={"flex"} justifyContent={"space-between"}>
                <Box mr={3}>
                    <ConnectKitButton></ConnectKitButton>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                    {/* <IconButton onClick={toggleMode}>
                        {theme.palette.mode === "dark" ? (
                            <LightModeOutlinedIcon />
                        ) : (
                            <DarkModeOutlinedIcon />
                        )}
                    </IconButton>
                    */}
                </Box>
            </Box>
        </Box>
    );
}

export default TopBar;
