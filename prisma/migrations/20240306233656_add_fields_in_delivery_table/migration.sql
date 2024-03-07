/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `endAt` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `startAt` on the `Delivery` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `house_number` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity_product` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "createdAt",
DROP COLUMN "endAt",
DROP COLUMN "orderId",
DROP COLUMN "startAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "end_at" TIMESTAMP(3),
ADD COLUMN     "house_number" INTEGER NOT NULL,
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "product_id" TEXT NOT NULL,
ADD COLUMN     "quantity_product" INTEGER NOT NULL,
ADD COLUMN     "reference" TEXT,
ADD COLUMN     "start_at" TIMESTAMP(3),
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;
