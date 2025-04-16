export function response(data: any) {
  return {
    status: "success",
    data: data,
  };
}

export function error(message: string) {
  return {
    status: "error",
    error: message,
  };
}

export function created(data: any) {
  return response(data);
}

export function ok(data: any) {
  return response(data);
}

export function notFound(message: string) {
  return error(message);
}

export function badRequest(message: string) {
  return error(message);
}

export function internalServerError(message: string) {
  return error(message);
}

export function unauthorized(message: string) {
  return error(message);
}
