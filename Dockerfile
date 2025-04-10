FROM node:20-slim

# Install Chromium dependencies
RUN apt-get update && apt-get install -y \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxcomposite1 \
    libxrandr2 \
    libxdamage1 \
    libgbm1 \
    libasound2 \
    libpangocairo-1.0-0 \
    libpangoft2-1.0-0 \
    libgtk-3-0 \
    fonts-liberation \
    xdg-utils \
    wget \
    --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy yarn files first for caching
COPY package.json yarn.lock ./

# Install dependencies (including puppeteer)
RUN yarn install

# Copy the rest of the project
COPY . .

# Expose app port (optional)
EXPOSE 3000

CMD ["yarn", "dev"]








# # Base image
# FROM node:20-slim AS base

# # Install dependencies only when needed
# FROM base AS deps
# WORKDIR /app

# # Install dependencies using yarn
# COPY package.json yarn.lock ./
# RUN yarn --frozen-lockfile

# # Install Puppeteer dependencies
# RUN apt-get update && apt-get install -y \
#     chromium \
#     libnss3 \
#     fonts-freefont-ttf \
#     libfreetype6 \
#     libharfbuzz0b \
#     ca-certificates \
#     dumb-init \
#     --no-install-recommends && \
#     rm -rf /var/lib/apt/lists/*

# # Set environment variables for Puppeteer
# # ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
# ENV    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# # Rebuild the source code only when needed
# FROM base AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .
# ENV NEXT_TELEMETRY_DISABLED=1
# RUN npm run build

# # Production image, copy all the files and run next
# FROM base AS runner
# WORKDIR /app

# ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1

# # Install Puppeteer dependencies in the runner image as well
# RUN apt-get update && apt-get install -y \
#     chromium \
#     libnss3 \
#     fonts-freefont-ttf \
#     libfreetype6 \
#     libharfbuzz0b \
#     ca-certificates \
#     dumb-init \
#     --no-install-recommends && \
#     rm -rf /var/lib/apt/lists/*

# # Set environment variables for Puppeteer
# # ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
# ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# # Copy necessary files from builder stage first
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/scripts ./scripts

# # Set the correct permission for prerender cache
# RUN mkdir .next
# RUN chown nextjs:nodejs .next

# # Create the data directory needed by the scraper BEFORE switching user
# RUN mkdir -p /app/data
# RUN chown nextjs:nodejs /app/data

# # Switch to the non-root user
# USER nextjs

# EXPOSE 3000

# ENV PORT=3000
# ENV HOSTNAME="0.0.0.0"

# ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# CMD ["node", "server.js"]


