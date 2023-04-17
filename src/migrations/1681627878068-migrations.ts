import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1681627878068 implements MigrationInterface {
    name = 'Migrations1681627878068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`originLat\` varchar(255) NOT NULL, \`originLng\` varchar(255) NOT NULL, \`destLat\` varchar(255) NOT NULL, \`destLng\` varchar(255) NOT NULL, \`distance\` int NOT NULL, \`status\` enum ('UNASSIGNED', 'TAKEN') NOT NULL DEFAULT 'UNASSIGNED', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`order\``);
    }

}
