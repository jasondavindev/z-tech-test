import { buildActor } from 'test/factories/Actor';
import Validation from 'test/helpers/Validation';

import { Actor } from '@models/index';

describe('models/Actor', () => {
  describe('when name or movie is null', () => {
    it('return an error', () => {
      const invalidName = buildActor({ name: null } as Actor);

      expect(Validation(invalidName)).toEqual({
        name: {
          isNotEmpty: 'name should not be empty'
        }
      });

      const invalidMovie = buildActor({ movie: null } as Actor);

      expect(Validation(invalidMovie)).toEqual({
        movie: {
          isNotEmpty: 'movie should not be empty'
        }
      });
    });
  });

  describe('when is passed valid data', () => {
    it('return empty object', () => {
      const actor = buildActor();

      expect(Validation(actor)).toEqual({});
    });
  });
});
