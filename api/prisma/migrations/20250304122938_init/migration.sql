-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('TECNOLOGY', 'CLOTHES', 'FOOD', 'HOUSE', 'CARS', 'SPORTS');

-- CreateEnum
CREATE TYPE "ProductRating" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "sales" INTEGER NOT NULL DEFAULT 0,
    "category" "ProductCategory" NOT NULL,
    "rating" "ProductRating" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
