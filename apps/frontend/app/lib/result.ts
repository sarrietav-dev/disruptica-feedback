export type Ok<T> = {
  ok: true;
  value: T;
};

export type Err<E> = {
  ok: false;
  error: E;
};

export type Result<T, E> = Ok<T> | Err<E>;

// Helper functions to create Ok and Err results
export const ok = <T>(value: T): Ok<T> => ({ ok: true, value });
export const err = <E>(error: E): Err<E> => ({ ok: false, error });

// Utility functions to check the type of Result
export const isOk = <T, E>(result: Result<T, E>): result is Ok<T> =>
  result.ok === true;
export const isErr = <T, E>(result: Result<T, E>): result is Err<E> =>
  result.ok === false;
