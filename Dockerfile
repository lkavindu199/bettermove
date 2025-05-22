# Stage 1: Base image with common setup
FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat
ENV NEXT_TELEMETRY_DISABLED=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

# Stage 2: Dependencies installation
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --prod

# Stage 3: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json .
COPY --from=deps /app/pnpm-lock.yaml .
COPY tsconfig.json .
COPY next.config.mjs .
COPY src ./src
COPY public ./public
RUN pnpm run build

# Stage 4: Production runtime
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S -u 1001 -G nodejs nextjs

# Copy built assets with proper permissions
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Special handling for Payload CMS
RUN mkdir -p ./src/payload-types && \
    chown nextjs:nodejs ./src/payload-types

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]