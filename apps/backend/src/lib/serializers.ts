export function response(data: any, status: number) {
  return {
    statusCode: status,
    data: JSON.stringify(data),
  };
}

export function error(message: string, status: number) {
  return {
    statusCode: status,
    error: JSON.stringify({ message }),
  };
}

export function created(data: any) {
  return response(data, 201);
}

export function ok(data: any) {
  return response(data, 200);
}

export function notFound(message: string) {
  return error(message, 404);
}

export function badRequest(message: string) {
  return error(message, 400);
}

export function internalServerError(message: string) {
  return error(message, 500);
}

export function unauthorized(message: string) {
  return error(message, 401);
}
