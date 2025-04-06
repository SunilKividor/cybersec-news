# Base image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies using yarn
COPY package.json yarn.lock ./
# Ensure you have "type": "module" in your package.json to fix the warning mentioned in logs
# If not, add it to your actual package.json file before building
RUN yarn --frozen-lockfile

# Install Puppeteer dependencies
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      dumb-init

# Set environment variables for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Removing redundant scripts copy as COPY . . already covers it if scripts is in the root
# COPY scripts ./scripts

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

# Install Puppeteer dependencies in the runner image as well
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      dumb-init

# Set environment variables for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder stage first
COPY --from=builder /app/public ./public
# Copying scripts from builder ensures they are the ones potentially built/processed
COPY --from=builder /app/scripts ./scripts

# Set the correct permission for prerender cache
# Create the .next directory before copying into it
RUN mkdir .next
# No need to chown here, --chown in COPY handles it later

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Ensure .next directory itself is also owned correctly after copying
RUN chown nextjs:nodejs .next

# --- FIX START ---
# Create the data directory needed by the scraper BEFORE switching user
RUN mkdir -p /app/data
# Set ownership of the data directory to the user the app will run as
RUN chown nextjs:nodejs /app/data
# --- FIX END ---

# Switch to the non-root user
USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Use dumb-init to handle signals properly and directly execute the CMD
# No need for 'sh -c' anymore as we run a single command
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Run only the Next.js server process.
# Scraping is triggered via the API endpoint defined in your app (GET function).
# 'server.js' is the typical entrypoint for a standalone Next.js output.
CMD ["node", "server.js"]