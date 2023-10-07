import { MigrationInterface, QueryRunner } from "typeorm";

export class InvoiceDecimalAmount1696674617041 implements MigrationInterface {
    name = 'InvoiceDecimalAmount1696674617041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip" ADD "invoiceTotal" numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip" DROP COLUMN "invoiceTotal"`);
    }

}
