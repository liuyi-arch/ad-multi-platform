# 构建阶段
FROM node:20-slim AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --registry=https://registry.npmmirror.com

# 构建应用 (Vite 需要在构建时注入 API 地址)
ARG VITE_API_URL
ARG VITE_WS_URL
RUN VITE_API_URL=$VITE_API_URL VITE_WS_URL=$VITE_WS_URL pnpm turbo run build --filter=admin-web...

# 运行阶段
FROM nginx:stable-alpine
COPY --from=builder /app/apps/admin-web/dist /usr/share/nginx/html
# 如果有 SPA 路由，需要自定义 nginx 配置
COPY apps/admin-web/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
