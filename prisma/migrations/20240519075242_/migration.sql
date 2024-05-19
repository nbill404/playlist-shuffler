/*
  Warnings:

  - The primary key for the `Song` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Song" DROP CONSTRAINT "Song_pkey",
ADD CONSTRAINT "Song_pkey" PRIMARY KEY ("userId", "playlistId");
