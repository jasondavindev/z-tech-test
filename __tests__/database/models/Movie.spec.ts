import { buildActor } from 'test/factories/Actor';
import { buildMovie } from 'test/factories/Movie';
import Validation from 'test/helpers/Validation';

import { Movie } from '@models/index';

describe('models/Movie', () => {
  describe('when release date is null', () => {
    it('return an error', () => {
      const movie = buildMovie({ releaseDate: null } as Movie);
      expect(Validation(movie)).toEqual({
        releaseDate: {
          isDateString: 'releaseDate must be a ISOString'
        }
      });
    });
  });

  describe('when name is empty', () => {
    it('return an error', () => {
      const movie = buildMovie({ name: '' } as Movie);
      expect(Validation(movie)).toEqual({
        name: {
          isNotEmpty: 'name should not be empty'
        }
      });
    });
  });

  describe('when has more than ten actors', () => {
    it('returns an error', () => {
      const actors = Array(11).fill(buildActor);
      const movie = buildMovie({ actors } as Movie);

      expect(Validation(movie)).toEqual({
        actors: {
          arrayMaxSize: 'a movie can have a maximum of ten actors'
        }
      });
    });
  });

  describe('when has less than one actor', () => {
    it('returns an error', () => {
      const movie = buildMovie({ actors: [] } as Movie);

      expect(Validation(movie)).toEqual({
        actors: {
          arrayMinSize: 'a movie can have at least one actor'
        }
      });
    });
  });

  describe('when is passed valid data', () => {
    it('returns empty object', () => {
      const movie = buildMovie();
      expect(Validation(movie)).toEqual({});
    });
  });
});
