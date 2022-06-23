/*
  Warnings:

  - You are about to drop the `Explorer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Explorer";

-- CreateTable
CREATE TABLE "explorer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "mission" VARCHAR(255) NOT NULL,
    "azureCertification" BOOLEAN NOT NULL DEFAULT false,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "explorer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commander" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lang" VARCHAR(255) NOT NULL,
    "missionCommander" VARCHAR(255) NOT NULL,
    "enrollments" INTEGER NOT NULL,
    "hasCertification" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "commander_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "explorer_name_key" ON "explorer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "commander_name_key" ON "commander"("name");
