# Z-Tech

## Tecnologias

- Node.js
- TypeScript
- PostgreSQL
- TypeORM
- Jest
- Docker & Docker compose
- ESLint
- Winston

Integrado com GitHub Actions

## Rotas

As rotas e parâmetros foram adicionados na pasta `postman`

## Executando

Exporte as funções shell

```bash
source dev.sh
```

Inicie o setup

```bash
setup_dev_environment
```

Inicie a aplicação em dettach mode

```bash
dkupd
```

Aplicação rodando na porta [localhost:3000](http://localhost:3000/api/v1/movies)

Rode os testes

```bash
dktest
```

Derrube os containers

```bash
dkdown
```
