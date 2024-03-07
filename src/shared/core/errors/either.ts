export type Either<L, A> = Failure<L, A> | Success<L, A>;

export class Failure<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isFailure(): this is Failure<L, A> {
    return true;
  }

  isSuccess(): this is Success<L, A> {
    return false;
  }
}

export class Success<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isFailure(): this is Failure<L, A> {
    return false;
  }

  isSuccess(): this is Success<L, A> {
    return true;
  }
}

export const failure = <L, A>(l: L): Either<L, A> => {
  return new Failure(l);
};

export const success = <L, A>(a: A): Either<L, A> => {
  return new Success<L, A>(a);
};
