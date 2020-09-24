import { AbstractInfixNotation } from "./infix-abstract";
import type Decimal from "break_infinity.js";
import { toSubscript, abbreviate } from "../utils";

// Name comes from https://en.wikipedia.org/wiki/Long_and_short_scales
export class InfixLongScaleNotation extends AbstractInfixNotation {
  public readonly name: string = "Infix long scale";

  public formatDecimal(value: Decimal, places: number): string {
    return this.formatInfix(
      value,
      places
    ).replace(
      /[,.]/g,
      (x) => x === "." ? "," : ".");
  }

  public formatNegativeDecimal(value: Decimal, places: number): string {
    return `₋${this.formatDecimal(
      value,
      places
    )}`;
  }

  protected groupDigits = 6;

  protected canHandleZeroExponent = false;

  protected formatMantissa(digit: number): string {
    return toSubscript(digit);
  }

  protected formatExponent(exp: number): string {
    if (exp < 0) {
      return (exp / 6).toString();
    }
    return abbreviate(Math.floor(exp / 6));
  }
}
