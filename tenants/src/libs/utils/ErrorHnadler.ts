import { Request, Response, NextFunction } from "express";
import { CommonResponse, ResponseError } from "./Response";
export = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log("why");
  
  const error = new ResponseError({
    status: err.status || 500,
    msg: (err.message || err.msg || "No message") as string,
    reason: (err.reason || err.stack || "Somebody failed") as string,
    url: req.originalUrl,
    ip: req.ip,
    validationErrors: [],
  });

  res.status(error.status);
  res.json(new CommonResponse({ status: false, error }));
};
