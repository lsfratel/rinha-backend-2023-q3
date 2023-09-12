FROM oven/bun

WORKDIR /app

COPY src src
COPY package.json package.json
COPY bun.lockb bun.lockb

RUN bun install

CMD bun src/server.ts
