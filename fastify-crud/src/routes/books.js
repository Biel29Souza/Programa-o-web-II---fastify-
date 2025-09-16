export default async function booksRoutes(app) {
    // Schemas simples de validação (JSON Schema)

    const bookBodySchema = {
        type: 'object',
        required: ['title', 'author'],
        properties: {
            title: { type: 'string', minLength: 1},
            author: {type: 'string', minLength: 1}
        }
    };


    // const BibliotecarioBodySchema = {
    //     type: 'object',
    //     require: ['id'],
    //     properties: {
    //         nome: { type: 'string', minLength: 1},
    //         email: {type: 'string', minLength: 1},
    //         endereco: {type: 'string', minLength: 1},
    //         nascimento: {type: 'dateTime', minLength: 1}
    //     }
    // };




    const idParamSchema = {
        type: 'object',
        required: ['id'],
        properties: {
            // Mantemos como string e convertemos manualmente
            id: { type: 'string', pattern: '^[0-9]+$'}
        }
    }


    // CREATE
    app.post('/books', { schema: {body: bookBodySchema} }, async (req, reply) => {
        const { title, author} = req.body;
        const book = await app.prisma.book.create({ data: { title, author}});
        return reply.code(201).send(book);
    } )

    //READ (lista)
    app.get('/books', async (req, reply) => {
        const books = await app.prisma.book.findMany({
            orderBy: { id: 'asc'}
        })
        return reply.send(books);
    });

    // UPDATE
    app.put('/books/:id', {
        schema: {
            params: idParamSchema,
            body: bookBodySchema
        }
    }, async (req, reply) => {
        const id = parseInt(req.params.id);
        const { title, author } = req.body;

        try {
            const updated = await app.prisma.book.update({
                where: { id },
                data: { title, author }
            });
            return reply.send(updated);
        } catch (error) {
            return reply.code(404).send({ error: 'Livro não encontrado ou atualização falhou' });
        }
    });


    // DELETE
    app.delete('/books/:id', { schema: { params: idParamSchema } }, async (req, reply) => {
        const id = parseInt(req.params.id);

        try {
            await app.prisma.book.delete({ where: { id } });
            return reply.code(204).send();
        } catch (error) {
            return reply.code(404).send({ error: 'Livro não encontrado ou falha na exclusão' });
        }
    });


}