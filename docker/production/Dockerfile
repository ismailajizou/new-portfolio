##### DEPENDENCIES

FROM node:20-bookworm-slim AS deps
RUN apt-get update && apt-get install -y openssl python3 make g++ && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# Install dependencies based on the preferred package manager

COPY package.json yarn.lock ./

RUN npm install -g yarn@1.22.22
RUN yarn install

##### BUILDER

FROM node:20-bookworm-slim AS builder
ARG NEXT_PUBLIC_TWITTER_LINK
ARG NEXT_PUBLIC_GITHUB_LINK
ARG NEXT_PUBLIC_LINKEDIN_LINK
ARG NEXT_PUBLIC_RESUME_LINK
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY


WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build stage
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_TWITTER_LINK=${NEXT_PUBLIC_TWITTER_LINK}
ENV NEXT_PUBLIC_GITHUB_LINK=${NEXT_PUBLIC_GITHUB_LINK}
ENV NEXT_PUBLIC_LINKEDIN_LINK=${NEXT_PUBLIC_LINKEDIN_LINK}
ENV NEXT_PUBLIC_RESUME_LINK=${NEXT_PUBLIC_RESUME_LINK}
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ENV NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=${NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}

RUN SKIP_ENV_VALIDATION=1 yarn build

##### RUNNER

FROM gcr.io/distroless/nodejs20-debian12 AS runner
WORKDIR /app

ENV NODE_ENV production

ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["server.js"]