import {
    Button,
    InputAdornment,
    TextField,
    TextFieldProps,
} from "@mui/material";
import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { BN_1E, BN_UINT_MAX, BN_ZERO } from "../../lib/constants";
import {
    NumberTextFieldFormatter,
    NumberTextFieldParser,
    NumberTextFieldParserResult,
} from "./NumberTextField";

const defaultTokenDecimals = 18;
const defaultAllowNegative = false;
const defaultAllowZero = false;

export function tokenAmountParser(
    tokenDecimals: number,
    allowNegative: boolean,
    allowZero: boolean,
    maxValue?: string
): NumberTextFieldParser {
    return (value: string): NumberTextFieldParserResult => {
        const [left, right] = value.split(".");
        let bnLeft: BigNumber, bnRight: BigNumber;
        try {
            bnLeft =
                !left || !left.length ? BN_ZERO : BigNumber.from(left + "");
            bnRight =
                !right || !right.length
                    ? BN_ZERO
                    : BigNumber.from(
                          (right + "")
                              .padEnd(tokenDecimals, "0")
                              .substring(0, tokenDecimals)
                      );
        } catch (e: any) {
            return { parsedValue: null, errorText: "Invalid amount" };
        }
        if (bnRight.isNegative())
            return { parsedValue: null, errorText: "Invalid amount" };
        if (bnLeft.isNegative() && !allowNegative)
            return { parsedValue: null, errorText: "Negative amount" };
        if (bnRight.add(bnLeft).isZero() && !allowZero)
            return { parsedValue: null, errorText: "Zero amount" };
        const parsedValue = bnLeft.mul(BN_1E(tokenDecimals)).add(bnRight);
        if (parsedValue.gt(BN_UINT_MAX))
            return { parsedValue: null, errorText: "Amount too large" };
        if (maxValue && parsedValue.gt(BigNumber.from(maxValue)))
            return { parsedValue: null, errorText: "Amount above maximum" };
        return { parsedValue: parsedValue.toString(), errorText: undefined };
    };
}

export function tokenAmountFormatter(
    tokenDecimals: number
): NumberTextFieldFormatter {
    return (value: string | null) => {
        if (!value || value.length === 0) return "0";
        const parsedValue = BigNumber.from(value);
        if (parsedValue.isZero()) return "0";
        const left = parsedValue.div(BN_1E(tokenDecimals)).toString();
        const right = parsedValue
            .mod(BN_1E(tokenDecimals))
            .add(BN_1E(tokenDecimals))
            .toString()
            .substring(1)
            .replace(/0+$/, "");
        return right.length === 0 ? left : `${left}.${right}`;
    };
}

export type TokenAmountTextFieldProps = {
    initialValue?: string;
    onValueChange?: (value: string | null) => void;
    displayDecimals?: number;
    tokenDecimals?: number;
    tokenSymbol?: string;
    allowNegative?: boolean;
    allowZero?: boolean;
    maxValue?: string;
    textFieldProps?: TextFieldProps;
};

function TokenAmountTextField(props: TokenAmountTextFieldProps) {
    const textFieldProps = props.textFieldProps || {};
    const tokenDecimals = props.tokenDecimals || defaultTokenDecimals;
    const allowNegative = props.allowNegative || defaultAllowNegative;
    const allowZero = props.allowZero || defaultAllowZero;
    const maxValue = props.maxValue;

    const parse = useMemo(
        () =>
            tokenAmountParser(
                tokenDecimals,
                allowNegative,
                allowZero,
                maxValue
            ),
        [tokenDecimals, allowNegative, allowZero, maxValue]
    );

    const format = useMemo(
        () => tokenAmountFormatter(tokenDecimals),
        [tokenDecimals]
    );

    const [value, setValue] = useState<string>(
        format(props.initialValue || "0")
    );
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        const { parsedValue, errorText } = parse(value);
        setError(errorText);
        props.onValueChange?.(parsedValue);
    }, [value, parse, props]);

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    function onMaxButtonClick() {
        if (!maxValue) return;
        setValue(format(maxValue));
        props.onValueChange?.(maxValue);
    }

    return (
        <TextField
            {...textFieldProps}
            value={value}
            onChange={onChange}
            error={error ? true : false}
            helperText={error || ""}
            label={textFieldProps.label}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <>
                            {maxValue && (
                                <Button
                                    variant="text"
                                    size="small"
                                    disableRipple
                                    disabled={!!textFieldProps.disabled}
                                    onClick={onMaxButtonClick}
                                >
                                    Max
                                </Button>
                            )}
                            {props.tokenSymbol}
                        </>
                    </InputAdornment>
                ),
            }}
            {...textFieldProps}
        ></TextField>
    );
}

export default TokenAmountTextField;
