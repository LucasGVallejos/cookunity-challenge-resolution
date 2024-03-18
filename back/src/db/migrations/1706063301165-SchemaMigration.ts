import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaMigration1706063301165 implements MigrationInterface {
    name = 'SchemaMigration1706063301165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."deliveries_status_enum" AS ENUM('confirmed', 'not confirmed')`);
        await queryRunner.query(`CREATE TABLE "deliveries" ("id" SERIAL NOT NULL, "timeExpected" character varying NOT NULL, "status" "public"."deliveries_status_enum" NOT NULL DEFAULT 'not confirmed', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a6ef225c5c5f0974e503bfb731f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "delivery_items" ("id" SERIAL NOT NULL, "price" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "product_id" integer NOT NULL, "delivery_id" integer NOT NULL, CONSTRAINT "PK_421035bb04c4c87c2b220e5fa8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "image" character varying, "price" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "delivery_items" ADD CONSTRAINT "FK_0a526afb8ad24fb620f2c3d5014" FOREIGN KEY ("delivery_id") REFERENCES "deliveries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_items" ADD CONSTRAINT "FK_7e9bb458f408319e13ad4d8e32b" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        
        // Insert products
        await queryRunner.query(`INSERT INTO public.products(id, name, description, image, price, created_at, updated_at)
                VALUES 
                (1, 'Chicken Alfredo', 'Creamy pasta with grilled chicken', 'https://hips.hearstapps.com/hmg-prod/images/delish-221130-perfect-chicken-alfredo-0689-eb-1670449996.jpg?crop=1.00xw:0.737xh;0,0.134xh&resize=360:*', 15.79, NOW(), NOW()), 
                (2, 'Grilled Salmon', 'Healthy salmon fillet with herbs', 'https://hips.hearstapps.com/del.h-cdn.co/assets/18/11/1600x1600/square-1520957481-grilled-salmon-horizontal.jpg?resize=360:*', 18.75, NOW(), NOW()), 
                (3, 'Vegetarian Pizza', 'Fresh vegetables on a crispy crust', 'https://hips.hearstapps.com/hmg-prod/images/picture1-1563214531.png?crop=0.5810055865921788xw:1xh;center,top&resize=360:*', 14.50, NOW(), NOW()),
                (4, 'Caesar Salad', 'Classic Caesar salad with grilled chicken', 'https://hips.hearstapps.com/hmg-prod/images/chicken-caesar-salad7-1654809005.jpg?crop=0.590xw:0.880xh;0.0497xw,0.120xh&resize=360:*', 12.25, NOW(), NOW()),
                (5, 'Margherita Pizza', 'Traditional pizza with tomato, mozzarella, and basil', 'https://hips.hearstapps.com/delish/assets/cm/15/10/54f95ec028a68_-_pizza-del0814-def.png?crop=1.00xw:1.00xh;0,0&resize=360:*', 11.99, NOW(), NOW())`);

        // Insert deliveries
        await queryRunner.query(`INSERT INTO public.deliveries(id, "timeExpected", status, created_at, updated_at)
                VALUES 
                (1, '2024-12-25 18:38:45.687563', 'not confirmed', NOW(), NOW()),
                (2, '2024-02-20 18:38:45.687563', 'not confirmed', NOW(), NOW()),
                (3, '2024-03-20 18:38:45.687563', 'not confirmed', NOW(), NOW())`);

        // Insert delivery items
        await queryRunner.query(`INSERT INTO public.delivery_items(id, price, delivery_id, product_id, created_at, updated_at)
                VALUES 
                (1, 16.8, 1, 1, NOW(), NOW()),
                (2, 18.75, 1, 2, NOW(), NOW()),
                (3, 15, 2, 3, NOW(), NOW()),
                (4, 11.99, 2, 5, NOW(), NOW()),
                (5, 12, 3, 4, NOW(), NOW())`);
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery_items" DROP CONSTRAINT "FK_7e9bb458f408319e13ad4d8e32b"`);
        await queryRunner.query(`ALTER TABLE "delivery_items" DROP CONSTRAINT "FK_0a526afb8ad24fb620f2c3d5014"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "delivery_items"`);
        await queryRunner.query(`DROP TABLE "deliveries"`);
        await queryRunner.query(`DROP TYPE "public"."deliveries_status_enum"`);
    }

}
