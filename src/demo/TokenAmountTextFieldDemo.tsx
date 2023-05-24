import { useState } from "react";
import TokenAmountTextField from "../components/inputs/TokenAmountTextField";
import SectionWithHeading from "../components/sections/SectionWithHeading";
import {
    Box,
    Checkbox,
    Divider,
    FormControlLabel,
    FormGroup,
    Slider,
    TextField,
} from "@mui/material";
import { BN_1E } from "../lib/constants";

function TokenAmountTextFieldDemo(props: any) {
    const [value, setValue] = useState<string | null>("1000");
    const [tokenSymbol, setTokenSymbol] = useState<string>("DAI");
    const [tokenDecimals, setTokenDecimals] = useState<number>(18);
    const [maxValue, setMaxValue] = useState<string | undefined>(undefined);
    const [allowNegative, setAllowNegative] = useState<boolean>(false);
    const [allowZero, setAllowZero] = useState<boolean>(false);

    function handleAllowNegativeChecked(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setAllowNegative(event.target.checked ? true : false);
    }

    function handleAllowZeroChecked(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setAllowZero(event.target.checked ? true : false);
    }

    function handleMaxValueChecked(event: React.ChangeEvent<HTMLInputElement>) {
        setMaxValue(event.target.checked ? "100200000000000000000" : undefined);
    }

    function onValueChange(value: string | null) {
        setValue(value);
    }

    return (
        <SectionWithHeading heading="Token Amount Input Field">
            <Box p={1}>
                <Box mb={"1rem"}>
                    This is a text field for token amounts. It returns the input
                    value parsed as a integer BigNumber scaled by the token
                    decimals.
                </Box>
                <Divider variant="middle" light>
                    Options
                </Divider>
                <Box mt={"0.5rem"} mb={"0.5rem"}>
                    <FormGroup sx={{ pl: "1rem" }}>
                        <Box
                            alignItems={"center"}
                            display={"flex"}
                            mb={"0.5rem"}
                        >
                            <Box mr={"0.5rem"}>Token Symbol: </Box>
                            <TextField
                                size="small"
                                value={tokenSymbol}
                                onChange={(event) => {
                                    setTokenSymbol(event.target.value);
                                }}
                            ></TextField>
                        </Box>
                        <Box
                            alignItems={"center"}
                            display={"flex"}
                            mb={"0.5rem"}
                        >
                            <Box mr={"0.5rem"}>Token Decimals:</Box>
                            <Slider
                                size="small"
                                step={1}
                                min={1}
                                max={18}
                                value={tokenDecimals}
                                valueLabelDisplay="auto"
                                marks
                                onChange={(event, value) => {
                                    setTokenDecimals(value as number);
                                }}
                                sx={{ width: "18rem" }}
                            ></Slider>
                            <Box ml={"1rem"}>{tokenDecimals}</Box>
                        </Box>
                        <FormControlLabel
                            label="Max Value: 100.2"
                            control={
                                <Checkbox
                                    checked={maxValue ? true : false}
                                    onChange={handleMaxValueChecked}
                                />
                            }
                        ></FormControlLabel>
                        <FormControlLabel
                            label="Allow Negative Amounts"
                            control={
                                <Checkbox
                                    checked={allowNegative}
                                    onChange={handleAllowNegativeChecked}
                                />
                            }
                        ></FormControlLabel>
                        <FormControlLabel
                            label="Allow Zero as Amount"
                            control={
                                <Checkbox
                                    checked={allowZero ? true : false}
                                    onChange={handleAllowZeroChecked}
                                />
                            }
                        ></FormControlLabel>
                    </FormGroup>
                </Box>
                <Divider variant="middle" light>
                    Parsed Value: {value ?? <i>Invalid Amount</i>}
                </Divider>

                <Box p={"1rem"}>
                    <TokenAmountTextField
                        variant="outlined"
                        defaultValue={BN_1E(18).mul("1000").toString()}
                        tokenDecimals={tokenDecimals}
                        tokenSymbol={tokenSymbol}
                        onValueChange={onValueChange}
                        maxValue={maxValue}
                        allowNegative={allowNegative}
                        allowZero={allowZero}
                    ></TokenAmountTextField>
                </Box>
            </Box>
        </SectionWithHeading>
    );
}

export default TokenAmountTextFieldDemo;
