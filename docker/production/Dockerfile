##### DEPENDENCIES

FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Install dependencies based on the preferred package manager

COPY package.json yarn.lock* .yarnrc ./

RUN yarn --frozen-lockfile

##### BUILDER

FROM node:22-alpine AS builder
ARG MONGO_URI
ARG NEXT_PUBLIC_TWITTER_LINK
ARG NEXT_PUBLIC_GITHUB_LINK
ARG NEXT_PUBLIC_LINKEDIN_LINK
ARG UPLOADTHING_SECRET
ARG UPLOADTHING_APP_ID
ARG AUTH_SECRET
ARG AUTH_URL
ARG NEXT_PUBLIC_RESUME_LINK
ARG NEXT_PUBLIC_URL
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build stage
ENV NEXT_TELEMETRY_DISABLED=1
ENV MONGO_URI=${MONGO_URI}
ENV NEXT_PUBLIC_TWITTER_LINK=${NEXT_PUBLIC_TWITTER_LINK}
ENV NEXT_PUBLIC_GITHUB_LINK=${NEXT_PUBLIC_GITHUB_LINK}
ENV NEXT_PUBLIC_LINKEDIN_LINK=${NEXT_PUBLIC_LINKEDIN_LINK}
ENV UPLOADTHING_SECRET=${UPLOADTHING_SECRET}
ENV UPLOADTHING_APP_ID=${UPLOADTHING_APP_ID}
ENV AUTH_SECRET=${AUTH_SECRET}
ENV AUTH_URL=${AUTH_URL}
ENV NEXT_PUBLIC_RESUME_LINK=${NEXT_PUBLIC_RESUME_LINK}
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}

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