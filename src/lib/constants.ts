import { BigNumber } from "ethers";

export const BN_ZERO = BigNumber.from(0);
export const BN_ONE = BigNumber.from(1);
export const BN_UINT_MAX = BigNumber.from(2).pow(256).sub(1);

export const BN_1E = (n: number) => BigNumber.from(10).pow(n);
