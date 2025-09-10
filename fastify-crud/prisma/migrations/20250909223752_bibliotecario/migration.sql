-- CreateTable
CREATE TABLE "Bibliotecario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "nascimento" DATETIME NOT NULL
);
