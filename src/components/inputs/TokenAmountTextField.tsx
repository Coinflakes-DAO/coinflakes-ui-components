import NumberTextField, {
    NumberTextFieldParser,
    NumberTextFieldParserResult,
    NumberTextFieldProps,
} from "./NumberTextField";
import { BigNumber } from "ethers";
import { BN_1E, BN_UINT_MAX, BN_ZERO } from "../../lib/constants";

export type TokenAmountParserOptions = {
    tokenDecimals?: number;
    allowNegative?: boolean;
    allowZero?: boolean;
};

const tokenAmountDefaultParserOptions: TokenAmountParserOptions = {
    tokenDecimals: 18,
    allowNegative: false,
    allowZero: false,
};

export function tokenAmountParser(
    parserOpts?: TokenAmountParserOptions
): NumberTextFieldParser {
    const options = parserOpts || tokenAmountDefaultParserOptions;
    options.tokenDecimals = options.tokenDecimals || 18;
    const { tokenDecimals, allowNegative, allowZero } = options;
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
        return { parsedValue: parsedValue.toString(), errorText: undefined };
    };
}

export type TokenAmountTextFieldProps = Omit<
    NumberTextFieldProps,
    "parseNumber"
> & {
    tokenDecimals: number;
    tokenSymbol: string;
    parserOpts?: TokenAmountParserOptions;
};

function TokenAmountTextField(props: TokenAmountTextFieldProps) {
    const numberTextFieldProps = props as NumberTextFieldProps;
    const parse = tokenAmountParser(props.parserOpts);

    return (
        <NumberTextField
            {...numberTextFieldProps}
            parseNumber={parse}
        ></NumberTextField>
    );
}

export default TokenAmountTextField;
