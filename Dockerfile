# ==========================================
# Multi-Stage Dockerfile for Velora ID
# Framework: Next.js 16 (App Router) + React 19
# Package Manager: pnpm
# Mode: Standalone (Ultra-lightweight ~130MB)
# ==========================================

# ------------------------------------------
# Base Image: Alpine Linux with Node 22 LTS
# ------------------------------------------
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm@latest
WORKDIR /app

# ------------------------------------------
# Stage 1: Dependencies Installation
# ------------------------------------------
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --no-frozen-lockfile

# ------------------------------------------
# Stage 2: Application Build
# ------------------------------------------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables for build stage
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV DOCKER_BUILD=1

# Execute Next.js standalone build
RUN pnpm build

# ------------------------------------------
# Stage 3: Minimal Production Runner
# ------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Security: Create non-root unprivileged user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public directory for static files
COPY --from=builder /app/public ./public

# Setup .next directory and ownership
RUN mkdir .next && chown nextjs:nodejs .next

# Copy standalone build output and static bundles
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

EXPOSE 3000

# Start Next.js standalone production server
CMD ["node", "server.js"]
