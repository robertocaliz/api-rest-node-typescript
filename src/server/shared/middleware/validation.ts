import { RequestHandler } from 'express';
import { Schema, ValidationError } from 'yup';
import { StatusCodes } from 'http-status-codes';



type RequestField = 'body' | 'query' | 'params';
type GetSchema = <T>(schema: Schema<T>) => Schema<T>;
type AllSchemas = Record<RequestField, Schema<any>>;
type GetAllSchemas = (getSchema: GetSchema) => Partial<AllSchemas>;
type TValidation = (getAllSchemas: GetAllSchemas) => RequestHandler;



export const validation: TValidation = (getAllSchemas) => (req, res, next) => {
  const schemas = getAllSchemas(schema => schema);
  const errorsResult: Partial<Record<RequestField, Record<string, string>>> = {};
  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as RequestField], { abortEarly: false });
    } catch (error) {
      const yupError = <ValidationError>error;
      const errors: Record<string, string> = {};
      yupError.inner.forEach(error => {
        if (!error.path) return;
        errors[error.path] = error.message;
      });
      errorsResult[<RequestField>key] = errors;
    }
  });
  if (Object.entries(errorsResult).length === 0) {
    return next();
  }
  res.status(StatusCodes.BAD_REQUEST)
    .json({ errors: errorsResult });
};