import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/appError";
import { z, ZodError } from "zod";
import { ErrorCodeType } from "../enums/error-code.enum";

// Format the zod error response object to be sent whenever there is a validation error.
// We look into the errors object of the zod error.
const formatZodError = (res: Response, error: z.ZodError) => {
  const errors = error?.issues.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: "Validation Failed",
    errors: errors,
    errorCode: ErrorCodeType.VALIDATION_ERROR,
  });
};

export const errorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  console.error(`Error occurred on PATH: ${req.path}`, error);

  // For syntax errors
  if (error instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid JSON format. Please check the request body",
    });
  }

  if (error instanceof ZodError) {
    return formatZodError(res, error);
  }

  // For Application errors
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: error?.message || "Unknown error occurred",
  });
};
