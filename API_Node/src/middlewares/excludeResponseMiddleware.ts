export function excludeResponseMiddleware(
    obj: any,
    keysDelete: any
  ) {
    let tempData: any = obj;
  
    for (let keyDelete of keysDelete) {
      for (let [key, value] of Object.entries(obj)) {
        if (
          typeof value === 'object' &&
          !Array.isArray(obj[key]) &&
          value !== null &&
          obj[key] !== null
        ) {
          tempData[key] = excludeResponseMiddleware(
            obj[key],
            keysDelete
          );
        }
        delete obj[keyDelete];
      }
    }
  
    return tempData;
  }
  