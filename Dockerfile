# # Etapa de build
# FROM node:22-alpine AS builder

# WORKDIR /app
# RUN corepack enable

# # Copia package.json e lockfile
# COPY ./package.json ./pnpm-lock.yaml ./

# RUN pnpm install --frozen-lockfile

# # Copia todo o restante do código
# COPY . .
# RUN pnpm build

# # Etapa final para produção
# FROM node:22-alpine AS runner

# WORKDIR /app
# ENV NODE_ENV=production
# RUN corepack enable

# # Copia apenas os arquivos necessários para rodar a app
# COPY --from=builder /app/package.json ./
# COPY --from=builder /app/pnpm-lock.yaml ./
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public

# EXPOSE 3000
# CMD ["pnpm", "start"]

# --- build

FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# --- run (standalone)
FROM node:22-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# cria usuário não-root para segurança
RUN adduser -S nextjs && chown -R nextjs:nextjs /app

# copia apenas o necessário para rodar
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

USER nextjs
ENV PORT=3000
EXPOSE 3000

# Render injeta PORT — usamos host 0.0.0.0 para aceitar conexões externas
# CMD ["sh","-c","node server.js -p $PORT -H 0.0.0.0"]
CMD ["sh","-c","HOSTNAME=0.0.0.0 node server.js"]

