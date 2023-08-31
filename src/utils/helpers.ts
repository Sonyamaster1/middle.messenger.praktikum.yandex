export type Indexed<T = any> = {
  [key in string]: T;
};

type StringIndexed = Record<string, any>;

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (let p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }
  return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') {
    return;
  }
  if (typeof object !== 'object') {
    return object;
  }
  const test = path.split('.');
  const test2 = test.reduceRight((acc, key) => ({ [key]: acc }), value);
  return merge(object as Object, test2 as Indexed);
}

export function queryStringify(data: StringIndexed): string | never {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    const value = data[key];
    const endLine = index < keys.length - 1 ? '&' : '';

    if (Array.isArray(value)) {
      const arrayValue = value.reduce<StringIndexed>(
        (resultArr, arrData, idx) => ({
          ...resultArr,
          [`${key}[${idx}]`]: arrData,
        }),
        {},
      );

      return `${result}${queryStringify(arrayValue)}${endLine}`;
    }

    if (typeof value === 'object') {
      const objValue = Object.keys(value || {}).reduce<StringIndexed>(
        (resultObj, objKey) => ({
          ...resultObj,
          [`${key}[${objKey}]`]: value[objKey],
        }),
        {},
      );

      return `${result}${queryStringify(objValue)}${endLine}`;
    }

    return `${result}${key}=${value}${endLine}`;
  }, '');
}
