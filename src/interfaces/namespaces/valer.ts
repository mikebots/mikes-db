import defaultModel from "../../models/defaultModel";

export namespace valer {
  export function create(modl: any, data: any) {
    return new modl({ Key: data.key, Value: data.value, exists: true });
  }
  export async function deletekey(key: any, model: typeof defaultModel) {
    return await model.deleteOne({ Key: key });
  }
  export async function searchKey(
    key: any,
    model: typeof defaultModel,
    single = false,
    opt: any,
    raw = false
  ) {
    if (opt?.search) {
      let possibleValues = await model.find({ exists: true });
      possibleValues = possibleValues.filter((val: any) => {
        typeof val.Key == "string" && opt.search instanceof String
          ? val.Key.startsWith(opt?.search)
          : !val.Key.match(opt?.search) == false;
      });

      if (raw)
        return possibleValues.map((val) => {
          return {
            value: val.Value,
            key: val.Key,
            exists: true,
          };
        });
      else if (!single) return possibleValues.map((val) => val.Value);
      return possibleValues[0].Value;
    }
    if (opt?.keyType) {
      if (!["string", "object", "number"].includes(opt.keyType))
        throw new Error(`KeyType must be "string" , "number" or "object"`);
      let possibleValues = await model.find({ exists: true });
      possibleValues = possibleValues.filter((val) => {
        typeof val.Key == opt.keyType;
      });
      if (raw)
        return possibleValues.map((val) => {
          return {
            value: val.Value,
            key: val.Key,
            exists: true,
          };
        });
      if (!single) return possibleValues.map((val) => val.Value);
      return possibleValues[0].Value;
    }
    if(opt?.valType) {
      if (!["string", "object", "number"].includes(opt.valType))
      throw new Error(`ValType must be "string" , "number" or "object"`);
    let possibleValues = await model.find({ exists: true });
    possibleValues = possibleValues.filter((val) => {
      typeof val.Value == opt.keyType;
    });
    if (raw)
      return possibleValues.map((val) => {
      return {
          value: val.Value,
          key: val.Key,
          exists: true,
        };
      });
    if (!single) return possibleValues.map((val) => val.Value);
    return possibleValues[0] ? possibleValues[0].Value : undefined;
    }
    if (raw) {
      if (single) return await model.findOne({ Key: key });
      else return await model.find({ Key: key });
    }
    return (await model.findOne({ Key: key, exists: true}))?.Value
  }
}

