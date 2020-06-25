import { buildActor } from 'test/factories/Actor';
import Validation from 'test/helpers/Validation';

describe('models/Actor', () => {
  describe('when is passed valid data', () => {
    it('return empty object', () => {
      const actor = buildActor();

      expect(Validation(actor)).toEqual({});
    });
  });
});
