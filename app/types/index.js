export type ResultItemType = {
  resourceURI: string,
  name: string,
};

export type ThumbnailType = {
  path: string,
  extension: string,
};

export type ResultCategoryType = {
  available: number,
  collectionURI: string,
  returned: number,
  items: Array<ResultItemType>,
};

export type URLType = {
  type: string,
  url: string,
};

export type ResultType = {
  id: number,
  name: string,
  description: string,
  modified: string,
  thumbnail: ThumbnailType,
  comics: ResultCategoryType,
  series: ResultCategoryType,
  stories: ResultCategoryType,
  events: ResultCategoryType,
  urls: Array<URLType>,
};

export type CharacterResponseDataType = {
  offset: number,
  limit: number,
  total: number,
  count: number,
  results: Array<ResultType>,
};

export type CharacterResponseType = {
  code: number,
  status: string,
  copyright: string,
  attributionHTML: string,
  attributionText: string,
  etag: string,
  data: CharacterResponseDataType,
};

export type CharacterRequestType = {
  name: string,
  limit: number,
  offset: number,
};
