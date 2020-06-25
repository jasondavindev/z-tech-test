import { Service } from 'typedi';
import { In } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { isNumber } from 'util';

import { Actor } from '@models/index';
import ActorRepository from '@repositories/Actor';

@Service()
export default class ActorService {
  constructor(@OrmRepository() private repository: ActorRepository) {}

  private async findByNameOrId(actors: Actor[]): Promise<Actor[]> {
    const names = actors.map((actor) => actor?.name);
    const ids = actors.filter(isNumber);

    return this.repository.find({
      where: [
        {
          name: In(names)
        },
        {
          id: In(ids)
        }
      ]
    });
  }

  async findOrCreateList(actors: Actor[]): Promise<Actor[]> {
    const foundActors = await this.findByNameOrId(actors);
    const foundActorsNames = foundActors.map((actor) => actor.name);

    const notFoundActors = actors.filter(
      (actor) => (actor as Object)?.hasOwnProperty('name') && !foundActorsNames.includes(actor.name)
    );

    const createdActors = await this.repository.save(notFoundActors);

    return foundActors.concat(createdActors);
  }
}
