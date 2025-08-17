# Tasks UI · Next.js (SSR)

Frontend em Next.js consumindo a API de tarefas.  
✅ **Produção (UI):** https://task-ui.onrender.com  
✅ **API:** https://task-api-nxz7.onrender.com

[![Screenshot](./docs/screenshot-home.png)](https://task-ui.onrender.com)

---

## 🧱 Stack
- Next.js (standalone/SSR) · TypeScript
- pnpm · Docker · Render

## 🔐 Variáveis de ambiente
Somente variáveis **NEXT_PUBLIC_*** são expostas no client.
```env
NEXT_PUBLIC_API_URL=https://task-api-nxz7.onrender.com
```
Você pode versionar `.env.local` (liberando com `!.env.local` no `.gitignore`) **ou** definir essa env no Render.

## ▶️ Rodando localmente
```bash
pnpm install
# garanta um .env.local com NEXT_PUBLIC_API_URL
pnpm dev
# http://localhost:3000
```

## 🐳 Docker
_O projeto já vem com Dockerfile (build + standalone)._  
Comandos típicos:
```bash
docker build -t tasks-ui .
docker run --rm -p 3000:3000 tasks-ui
# abre http://localhost:3000
```

## ☁️ Deploy (Render)
1. **Web Service** (Docker) → selecione o repositório do front.  
2. **Health Check Path**: `/`.  
3. **Environment**: (opcional) `NEXT_PUBLIC_API_URL` — se não versionar `.env.local`.  
4. **Auto-Deploy** ligado para CI/CD.

## 🔗 Integração com a API
Use a URL da env em todas as chamadas:
```ts
const API = process.env.NEXT_PUBLIC_API_URL!;
const res = await fetch(`${API}/tasks`, { cache: 'no-store' });
```

## 🛡️ CORS (no backend)
No serviço da API (Render), defina:
```env
CORS_ORIGIN=https://task-ui.onrender.com,http://localhost:3000
```

---
