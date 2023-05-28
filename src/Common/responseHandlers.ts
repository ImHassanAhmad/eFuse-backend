export const errorHandler = (
  code: number,
  message: string | object,
  res: any
): any => {
  return res.status(code).send({ success: false, message: message });
};
export const responseHandler = (
  code: number,
  message: string | object,
  res: any,
  payload: object = {}
): any => {
  return res
    .status(code)
    .send({ success: true, message: message, payload: payload });
};
