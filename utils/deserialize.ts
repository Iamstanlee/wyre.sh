const deserialize = <T>(data: string | T): T => {
  try {
    return JSON.parse(data as string) as T;
  } catch (e) {
    return data as T;
  }
};

const serialize = <T>(data: T): string => {
  return JSON.stringify(data);
};

export { deserialize, serialize };