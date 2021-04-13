import { LoginUserValidationMiddleware } from './login-user-validation.middleware';

describe('LoginUserValidationMiddleware', () => {
  it('should be defined', () => {
    expect(new LoginUserValidationMiddleware()).toBeDefined();
  });
});
