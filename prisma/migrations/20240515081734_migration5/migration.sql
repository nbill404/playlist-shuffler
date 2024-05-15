-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "starred" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "starred" BOOLEAN NOT NULL DEFAULT false;
