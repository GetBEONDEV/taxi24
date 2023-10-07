import { MigrationInterface, QueryRunner } from "typeorm";

export class Invoice1696673317165 implements MigrationInterface {
    name = 'Invoice1696673317165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "invoice" ("id" SERIAL NOT NULL, "amount" numeric NOT NULL, CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "trip" ADD "invoiceId" integer`);
        await queryRunner.query(`ALTER TABLE "trip" ADD CONSTRAINT "UQ_f1a477cdd7312e24f85fb5e5fde" UNIQUE ("invoiceId")`);
        await queryRunner.query(`ALTER TABLE "trip" ADD CONSTRAINT "FK_f1a477cdd7312e24f85fb5e5fde" FOREIGN KEY ("invoiceId") REFERENCES "invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip" DROP CONSTRAINT "FK_f1a477cdd7312e24f85fb5e5fde"`);
        await queryRunner.query(`ALTER TABLE "trip" DROP CONSTRAINT "UQ_f1a477cdd7312e24f85fb5e5fde"`);
        await queryRunner.query(`ALTER TABLE "trip" DROP COLUMN "invoiceId"`);
        await queryRunner.query(`DROP TABLE "invoice"`);
    }

}
