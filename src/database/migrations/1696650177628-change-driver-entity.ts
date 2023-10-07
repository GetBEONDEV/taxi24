import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDriverEntity1696650177628 implements MigrationInterface {
    name = 'ChangeDriverEntity1696650177628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "driver" ADD "status" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "driver" ADD "status" character varying NOT NULL DEFAULT 'available'`);
    }

}
