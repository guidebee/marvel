import apisauce from 'apisauce';
import md5 from 'md5';
import type { CharacterRequestType } from '../types';

const create = () => {
  // in production, should use apiKey only with referer settings to
  // avoid security breach. Marvel doesnt support use local address
  // in the Refer setting which caused CORS issue.
  const apiKey = '02f3bdc11421ffa4853d803051ad7e69';
  const privateKey = '2d93cf25f7de71690ae256dc4f74d0aed06746d8';
  const api = apisauce.create({
    baseURL: 'https://gateway.marvel.com/v1/public',
    // 30 second timeout...
    timeout: 30000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const authentication = () => {
    const ts = new Date().getTime();
    const hashValue = md5(ts + privateKey + apiKey).toString();
    return `ts=${ts}&apikey=${apiKey}&hash=${hashValue}`;
  };

  const getCharacters = (request: CharacterRequestType) => {
    if (request.name) {
      return api.get(
        `/characters?${authentication()}&nameStartsWith=${
          request.name
        }&limit=${request.limit || 20}&offset=${request.offset || 0}`,
      );
    }
    return api.get(
      `/characters?${authentication()}&limit=${request.limit ||
        20}&offset=${request.offset || 0}`,
    );
  };

  return {
    getCharacters,
    setHeader: api.setHeader,
  };
};

export default {
  create,
};
