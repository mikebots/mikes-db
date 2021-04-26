import { TNumber } from "../../enums/NumberBooleanStringObject";
import ArrayClass from "../../classes/Array";
export namespace TNumberSpace {
  export function resolve(t: TNumber) : number {
    return ["string", "number"].includes(typeof t)
      ? Number(t)
      : ArrayClass.isArray(t)
      ? new ArrayClass(t).all((d) => typeof d == "string" && !isNaN(Number(d)))
        ? t.map((d) => Number(d)).reduce((a, b) => a + b)
        : t.length
      : typeof t == "object"
      ? Object.keys(t).length
        ? typeof t == "boolean"
          ? !t
            ? 0
            : 1
          : Number(t)
        : Number(t)
      : Number(t);
  }
}
