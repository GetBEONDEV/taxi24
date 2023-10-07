import { MigrationInterface, QueryRunner } from "typeorm";

export class InvoiceDecimal1696673619735 implements MigrationInterface {
    name = 'InvoiceDecimal1696673619735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "invoice" ADD "amount" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "invoice" ADD "amount" numeric NOT NULL`);
    }

}
