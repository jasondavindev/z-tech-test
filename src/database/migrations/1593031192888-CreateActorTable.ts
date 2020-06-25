import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreateActorTable1593031192888 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'actors',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true
          }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'movie_actors',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true
          },
          {
            name: 'movie_id',
            type: 'integer',
            isNullable: false
          },
          {
            name: 'actor_id',
            type: 'integer',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true
          }
        ]
      })
    );

    await queryRunner.createForeignKey(
      'movie_actors',
      new TableForeignKey({
        columnNames: ['movie_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movies',
        name: 'FK_ACTORS_MOVIES',
        onDelete: 'CASCADE'
      })
    );

    await queryRunner.createForeignKeys('movie_actors', [
      new TableForeignKey({
        columnNames: ['movie_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movies',
        name: 'FK_MOVIE_ACTORS_MOVIES',
        onDelete: 'CASCADE'
      }),
      new TableForeignKey({
        columnNames: ['actor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'actors',
        name: 'FK_MOVIE_ACTORS_ACTORS',
        onDelete: 'CASCADE'
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movie_actors', true, true);
    await queryRunner.dropTable('actors', true, true);
  }
}
