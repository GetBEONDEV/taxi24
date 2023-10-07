import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPassengerName1696661259780 implements MigrationInterface {
    name = 'AddPassengerName1696661259780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "passenger" ADD "name" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "passenger" DROP COLUMN "name"`);
    }

}
