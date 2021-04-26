export default class ArrayClass<T> extends Array<T> {
  constructor(...items: T[]) {
    super(...items);
  }
  public all(fn: (thisArg: T) => boolean): boolean {
    let arr: boolean[] = [];

    super.forEach((val) => {
      let result = fn.call(null, val);
      arr.push(result);
    });
    arr = arr.filter((arr) => arr);
    return arr.length == super.length;
  }
}
