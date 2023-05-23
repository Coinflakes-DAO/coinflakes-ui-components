import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

export type NumberTextFieldParserResult = {
    parsedValue: string | null;
    errorText: string | undefined;
};
export type NumberTextFieldParser = (
    value: string
) => NumberTextFieldParserResult;
export type NumberTextFieldFormatter = (value: string | null) => string;

export type NumberTextFieldProps = TextFieldProps & {
    parseNumber?: NumberTextFieldParser;
    formatNumber?: NumberTextFieldFormatter;
    onValueChange?: (value: string | null) => void;
};

export const numberTextFieldDefaultParser: NumberTextFieldParser = (
    value: string
): NumberTextFieldParserResult => {
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
        return { parsedValue: null, errorText: "Invalid number" };
    }
    return { parsedValue: parsedValue.toString(), errorText: undefined };
};

export const numberTextFieldDefaultFormatter: NumberTextFieldFormatter = (
    value: string | null
) => {
    if (value === null) return "0.0";
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
        return "0.0";
    }
    return parsedValue.toString();
};

function NumberTextField(props: NumberTextFieldProps) {
    const parse = props.parseNumber || numberTextFieldDefaultParser;
    const format = props.formatNumber || numberTextFieldDefaultFormatter;

    const textFieldProps = props as TextFieldProps;
    const defaultValue =
        textFieldProps.value && typeof textFieldProps.value === "string"
            ? format(textFieldProps.value)
            : format("");

    const [value, setValue] = React.useState<string>(defaultValue);
    const [error, setError] = React.useState<string | undefined>();

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
        const { parsedValue, errorText } = parse(event.target.value);
        setError(errorText);
        props.onValueChange?.(parsedValue);
    }

    return (
        <TextField
            {...textFieldProps}
            value={value}
            onChange={onChange}
            error={error ? true : false}
            helperText={error || ""}
            label={textFieldProps.label}
        ></TextField>
    );
}

export default NumberTextField;
