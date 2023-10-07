import { MigrationInterface, QueryRunner } from "typeorm";

export class EntitiesTripPassenger1696657936705 implements MigrationInterface {
    name = 'EntitiesTripPassenger1696657936705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trip" ("id" SERIAL NOT NULL, "driverId" integer, "passengerId" integer, CONSTRAINT "PK_714c23d558208081dbccb9d9268" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "passenger" ("id" SERIAL NOT NULL, CONSTRAINT "PK_50e940dd2c126adc20205e83fac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "trip" ADD CONSTRAINT "FK_2034f2f2e58179b42c4866f6f13" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trip" ADD CONSTRAINT "FK_f031867930db28ca4b27e4296f2" FOREIGN KEY ("passengerId") REFERENCES "passenger"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip" DROP CONSTRAINT "FK_f031867930db28ca4b27e4296f2"`);
        await queryRunner.query(`ALTER TABLE "trip" DROP CONSTRAINT "FK_2034f2f2e58179b42c4866f6f13"`);
        await queryRunner.query(`DROP TABLE "passenger"`);
        await queryRunner.query(`DROP TABLE "trip"`);
    }

}
