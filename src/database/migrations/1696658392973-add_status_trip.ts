import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusTrip1696658392973 implements MigrationInterface {
    name = 'AddStatusTrip1696658392973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip" ADD "status" character varying(255) NOT NULL DEFAULT 'active'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip" DROP COLUMN "status"`);
    }

}
