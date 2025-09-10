import Fastify from "fastify";
import { prisma } from './db.js';
import booksRoutes from "./routes/books.js";


export function buildApp() {
    const app = Fastify({ logger: true});


    // Deixa o Prisma disponível no Fastify
    app.decorate('prisma', prisma);

    // Rotas
    app.register(booksRoutes);
    //app.register(bibliotecarioRoutes);

    // Fechar o Prisma ao encerrar o app
    app.addHook('onClose', async (instance) => {
        await instance.prisma.$disconnect();
    });

    return app;
}