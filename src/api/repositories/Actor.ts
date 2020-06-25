import { EntityRepository, Repository } from 'typeorm';

import Actor from '@models/Actor';

@EntityRepository(Actor)
export default class ActorRepository extends Repository<Actor> {}
