aula fastify
prisma


# Parte 1

mkdir fastify-crud && cd fastify-crud 
npm init -y
npm i fastify @prisma/cliente
npm i -D prisma nodemon vitest


# parte 2   "Subistituir o package.json"


{
  "name": "fastify-crud",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "nodemon --watch . server.js",
    "start": "node server.js",
    "test": "vitest"
  },

  "dependencies": {
    "@prisma/client": "^5.0.0",
    "fastify": "^4.0.0"
  },

  "devDependencies": {
    "nodemon": "^3.0.0",
    "prisma": "^5.0.0",
    "vitest": "^1.6.0"
  }
}



# Parte 3

npx prisma init --datasource-provider sqlite



# Parte 4

npx prisma migrate dev --name init

npx prisma generate 
npx prisma studio


#Criacao do bibliotecario
npx prisma migrate dev --name bibliotecario

npx prisma generate

# Comando para ve o banco  
npx prisma studio



# Rodar projeto

npm run dev

