# Base image with Bun
FROM oven/bun:1.1

WORKDIR /app

# Install deps
COPY bun.lockb package.json ./
RUN bun install

# Build the Next.js app
# RUN bun run build

EXPOSE 3000

# Start the app
CMD ["bun", "run" , "dev"]
