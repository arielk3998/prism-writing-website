export class InvalidCredentialsError extends Error {
  constructor(message: string = 'Invalid email or password') {
    super(message);
    this.name = 'InvalidCredentialsError';
  }
}

export class UserExistsError extends Error {
  constructor(message: string = 'User already exists with this email') {
    super(message);
    this.name = 'UserExistsError';
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string = 'You are not authorized to perform this action') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}