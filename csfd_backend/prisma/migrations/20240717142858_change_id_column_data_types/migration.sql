/*
  Warnings:

  - You are about to alter the column `junior_id` on the `chances` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `BigInt`.
  - You are about to alter the column `senior_id` on the `hints` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `BigInt`.
  - You are about to alter the column `junior_id` on the `hints` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `BigInt`.
  - The primary key for the `students` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `students` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `BigInt`.
  - You are about to alter the column `senior_id` on the `students` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `BigInt`.

*/
-- DropForeignKey
ALTER TABLE "chances" DROP CONSTRAINT "junior___fk";

-- DropForeignKey
ALTER TABLE "hints" DROP CONSTRAINT "junior___fk";

-- DropForeignKey
ALTER TABLE "hints" DROP CONSTRAINT "senior___fk";

-- AlterTable
ALTER TABLE "chances" ALTER COLUMN "junior_id" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "hints" ALTER COLUMN "senior_id" SET DATA TYPE BIGINT,
ALTER COLUMN "junior_id" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "students" DROP CONSTRAINT "students_pk",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ALTER COLUMN "senior_id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "students_pk" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "chances" ADD CONSTRAINT "junior___fk" FOREIGN KEY ("junior_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hints" ADD CONSTRAINT "junior___fk" FOREIGN KEY ("junior_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hints" ADD CONSTRAINT "senior___fk" FOREIGN KEY ("senior_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;
