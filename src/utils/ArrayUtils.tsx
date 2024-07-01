export class KeyValueArray<A, B> extends Array<{ key: A, value: B }> {
  constructor(inputArray: any[]) {
    super();

    for (let i = 0; i < inputArray.length; i += 2) {
      if (i + 1 < inputArray.length) {
        this.push({ key: inputArray[i], value: inputArray[i + 1] });
      }
    }
  }
}

export class EvalPairArray<T> extends Array<{ condition: () => boolean, value: T }> {
  constructor(inputArray: any[]) {
    super();

    for (let i = 0; i < inputArray.length; i += 2) {
      if (i + 1 < inputArray.length) {
        this.push({ condition: inputArray[i], value: inputArray[i + 1] });
      }
    }
  }
}
