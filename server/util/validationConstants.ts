/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, ValidationSchema, Location as ParamLocation } from 'express-validator';

const optional = {
  optional: { options: { nullable: false } },
};

export const notNull = {
  exists: {
    options: { checkNull: true },
    errorMessage: 'Null value',
  },
};

export const notEmpty = {
  isEmpty: {
    negated: true,
    errorMessage: 'Empty string or Null',
  },
};

export const notNullOrEmpty = {
  // TODO: This may be unnecessary.. check
  ...notNull,
  ...notEmpty,
};

export const isDecimal = (nullable?: boolean): object => ({
  isDecimal: {
    errorMessage: 'Not a number',
  },
  ...(nullable && optional),
});

export const isBoolean = {
  isBoolean: {
    errorMessage: 'Not a boolean value',
  },
};

export const isMongoId = (nullable?: boolean) => ({
  isMongoId: {
    errorMessage: 'Not a valid id',
  },
  ...(nullable && { ...optional }),
});

export const isArray = {
  isArray: {
    errorMessage: 'Not an array',
  },
};

export const isString = (nullable?: boolean): object => ({
  custom: {
    options: (inputValue: string | number | boolean) =>
      nullable && inputValue == null
        ? Promise.resolve(inputValue)
        : typeof inputValue == 'string'
        ? Promise.resolve(inputValue)
        : Promise.reject('Not a string'),
  },
});

export const isIsoDate = (nullable?: boolean): object => ({
  custom: {
    options: (inputValue: any) => {
      if (nullable && inputValue == null) return Promise.resolve(inputValue);
      const dateValue = Date.parse(inputValue);
      return dateValue
        ? Promise.resolve(new Date(dateValue))
        : Promise.reject("Must be an ISO 8601 String 'YYYY-MM-DDTHH:MM:SSSZ'");
    },
  },
});

/**
 * Generates an express-validator schema to validate if query parameters are Mongo IDs
 * @param params names of query params to check for valid Mongo IDs
 */
export const createParamMongoIdValidationSchema = (location: ParamLocation, ...params: [string]): Schema => {
  const schema: ValidationSchema = {};

  params.forEach((param) => {
    schema[param] = {
      in: [location],
      ...isMongoId(),
    };
  });

  return schema;
};

export const isEnum = (e: object, nullable?: boolean): object => ({
  custom: {
    options: (inputValue: any) =>
      nullable && inputValue == null
        ? Promise.resolve(inputValue)
        : !isNaN(inputValue) || !(inputValue in e)
        ? Promise.reject(
            `Invalid option. Not one of ${Object.values(e)
              .slice(0, Object.keys(e).length / 2)
              .join('|')}`,
          )
        : Promise.resolve(inputValue),
  },
});

export const isIntWithin = (from: number, to: number, nullable?: boolean) => ({
  custom: {
    options: (inputValue: any) =>
      nullable && inputValue == null
        ? Promise.resolve(inputValue)
        : Number.isInteger(inputValue) && inputValue <= to && inputValue >= from
        ? Promise.resolve(inputValue)
        : Promise.reject(`Not an int within interval [${from}, ${to}]`),
  },
});
