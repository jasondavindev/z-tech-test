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

    return this.repository.find({
      where: [
        {
          name: In(names)
        }
      ]
    });
  }

  async findOrCreateList(actors: Actor[]): Promise<Actor[]> {
    const foundActors = await this.findByNameOrId(actors);
    const foundActorsNames = foundActors.map((actor) => actor.name);

    const notFoundActors = actors.filter(
      (actor) => actor.name && !foundActorsNames.includes(actor.name)
    );

    let createdActors: Actor[] = [];

    if (notFoundActors.length) {
      createdActors = await this.repository.save(notFoundActors);
    }

    return foundActors.concat(createdActors);
  }
}
