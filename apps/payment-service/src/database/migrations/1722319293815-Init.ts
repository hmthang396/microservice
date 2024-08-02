import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1722319293815 implements MigrationInterface {
  name = 'Init1722319293815';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`payments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`order_id\` int NOT NULL, \`payer_id\` int NOT NULL, \`provider\` enum ('Paypal', 'Stripe', 'COD', 'Visa') NOT NULL, \`status\` enum ('Initiated', 'Completed', 'Failed', 'Expired', 'Refunded') NOT NULL DEFAULT 'Initiated', \`amount\` decimal(10,2) NOT NULL DEFAULT '0.00', \`currency\` varchar(3) NOT NULL, \`initiated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`completed_at\` datetime NULL, \`wallet_updated\` tinyint NOT NULL DEFAULT 0, \`ledger_updated\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` datetime(6) NULL, INDEX \`IDX_fe52f02449eaf27be2b2cb7acd\` (\`order_id\`), INDEX \`IDX_edb1ecdd81ccd1462789350aaa\` (\`payer_id\`), UNIQUE INDEX \`IDX_3b6f5ba978729c5038646dea70\` (\`order_id\`, \`payer_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`psp_transactions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`payment_id\` int NOT NULL, \`idempotency_key\` varchar(50) NOT NULL, \`token\` varchar(255) NULL, \`type\` enum ('Payment', 'Refund') NOT NULL, \`status\` enum ('Initiated', 'Completed', 'Failed', 'Expired') NOT NULL DEFAULT 'Initiated', \`amount\` decimal(10,2) NOT NULL DEFAULT '0.00', \`currency\` varchar(3) NOT NULL, \`initiated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`completed_at\` datetime NULL, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`IDX_1954a2bd271cbf69c855d1a01e\` (\`idempotency_key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`psp_transactions\` ADD CONSTRAINT \`FK_aff7698f7015c07ea362c5924ca\` FOREIGN KEY (\`payment_id\`) REFERENCES \`payments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`psp_transactions\` DROP FOREIGN KEY \`FK_aff7698f7015c07ea362c5924ca\``);
    await queryRunner.query(`DROP INDEX \`IDX_1954a2bd271cbf69c855d1a01e\` ON \`psp_transactions\``);
    await queryRunner.query(`DROP TABLE \`psp_transactions\``);
    await queryRunner.query(`DROP INDEX \`IDX_3b6f5ba978729c5038646dea70\` ON \`payments\``);
    await queryRunner.query(`DROP INDEX \`IDX_edb1ecdd81ccd1462789350aaa\` ON \`payments\``);
    await queryRunner.query(`DROP INDEX \`IDX_fe52f02449eaf27be2b2cb7acd\` ON \`payments\``);
    await queryRunner.query(`DROP TABLE \`payments\``);
  }
}
