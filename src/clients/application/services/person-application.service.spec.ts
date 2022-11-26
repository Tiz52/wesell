import { RegisterPersonRequest } from '../dtos/request/register-person-request.dto';

describe('PersonRegister', () => {
  let personRegistred: RegisterPersonRequest;

  beforeEach(() => {
    personRegistred = new RegisterPersonRequest(
      'test',
      'test',
      '23456789',
      'test@test.com',
    );
  });

  describe('dni', () => {
    it('should be valid', () => {
      console.log(personRegistred);
      expect(personRegistred.dni).toMatch(/^[0-9]{8}$/);
    });
  });

  describe('email', () => {
    it('should be valid', () => {
      expect(personRegistred.email).toMatch(
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      );
    });
  });
});
