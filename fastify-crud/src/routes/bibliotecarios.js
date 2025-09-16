export default async function bibliotecariosRoutes(app) {
    // Schemas simples de validação (JSON Schema)

    const BibliotecarioBodySchema = {
        type: 'object',
        required: ['id'],
        properties: {
            nome: { type: 'string', minLength: 1 },
            email: { type: 'string', format: 'email' },
            endereco: { type: 'string', minLength: 1 },
            nascimento: { type: 'string', format: 'date-time' }
        }
    };

    const idParamSchema = {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string', pattern: '^[0-9]+$' }
        }
    };

    // CREATE
    app.post('/bibliotecarios', { schema: { body: BibliotecarioBodySchema } }, async (req, reply) => {
        const { nome, email, endereco, nascimento } = req.body;
        const bibliotecario = await app.prisma.bibliotecario.create({
            data: { nome, email, endereco, nascimento: new Date(nascimento) }
        });
        return reply.code(201).send(bibliotecario);
    });

    // READ (lista)
    app.get('/bibliotecarios', async (req, reply) => {
        const bibliotecarios = await app.prisma.bibliotecario.findMany({
            orderBy: { id: 'asc' }
        });
        return reply.send(bibliotecarios);
    });

    // READ (individual)
    app.get('/bibliotecarios/:id', { schema: { params: idParamSchema } }, async (req, reply) => {
        const id = parseInt(req.params.id);
        const bibliotecario = await app.prisma.bibliotecario.findUnique({ where: { id } });

        if (!bibliotecario) {
            return reply.code(404).send({ error: 'Bibliotecário não encontrado' });
        }

        return reply.send(bibliotecario);
    });

    // UPDATE
    app.put('/bibliotecarios/:id', {
        schema: {
            params: idParamSchema,
            body: BibliotecarioBodySchema
        }
    }, async (req, reply) => {
        const id = parseInt(req.params.id);
        const { nome, email, endereco, nascimento } = req.body;

        try {
            const atualizado = await app.prisma.bibliotecario.update({
                where: { id },
                data: { nome, email, endereco, nascimento: new Date(nascimento) }
            });
            return reply.send(atualizado);
        } catch (error) {
            return reply.code(404).send({ error: 'Bibliotecário não encontrado ou falha na atualização' });
        }
    });

    // DELETE
    app.delete('/bibliotecarios/:id', { schema: { params: idParamSchema } }, async (req, reply) => {
        const id = parseInt(req.params.id);

        try {
            await app.prisma.bibliotecario.delete({ where: { id } });
            return reply.code(204).send();
        } catch (error) {
            return reply.code(404).send({ error: 'Bibliotecário não encontrado ou falha na exclusão' });
        }
    });
}
