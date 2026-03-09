# 构建阶段
FROM node:20-slim AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# 构建应用
ARG VITE_API_URL
ARG VITE_WS_URL
ARG VITE_ADMIN_URL
RUN VITE_API_URL=$VITE_API_URL VITE_WS_URL=$VITE_WS_URL VITE_ADMIN_URL=$VITE_ADMIN_URL pnpm run build --filter=advertiser-web...

# 运行阶段
FROM nginx:stable-alpine
COPY --from=builder /app/apps/advertiser-web/dist /usr/share/nginx/html
COPY apps/advertiser-web/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
