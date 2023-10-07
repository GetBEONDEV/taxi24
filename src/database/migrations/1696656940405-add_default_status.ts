import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultStatus1696656940405 implements MigrationInterface {
    name = 'AddDefaultStatus1696656940405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" ALTER COLUMN "status" SET DEFAULT 'available'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" ALTER COLUMN "status" DROP DEFAULT`);
    }

}
