# UI Notas

Uma aplicação Next.js para renomear notas fiscais.

## Pré-requisitos

- Node.js (versão LTS mais recente)
- pnpm

## Instalação do pnpm

```bash
npm install -g pnpm
```

## Começando

1. Clone o repositório
2. Instale as dependências:
```bash
pnpm install
```

3. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## Desenvolvimento

A aplicação irá recarregar automaticamente se você alterar qualquer arquivo fonte no diretório `app`.

## Build

Para construir a aplicação para produção:
```bash
pnpm build
```
