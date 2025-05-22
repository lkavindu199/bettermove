# To use this Dockerfile, set `output: 'standalone'` in your next.config.mjs.

FROM node:22.12.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps

# Needed for some Node.js binaries on Alpine
RUN apk add --no-cache libc6-compat

# Install pnpm and configure it
RUN npm install -g pnpm@9 && \
    pnpm config set verify-store-integrity false

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

# Prerender cache permissions
RUN mkdir -p .next && \
    chown nextjs:nodejs .next

# Copy standalone build output with correct ownership
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
