FROM oven/bun:1.1

WORKDIR /app

COPY bun.lockb package.json ./
RUN bun install

EXPOSE 8000

CMD ["bun", "run", "dev"]
