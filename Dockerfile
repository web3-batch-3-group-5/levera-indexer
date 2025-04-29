FROM node:18-alpine
WORKDIR /usr/src/subgraph

# Copy package files first for layer caching
COPY package*.json ./
COPY ponder.config.ts ./
COPY ponder.schema.ts ./
COPY tsconfig.json ./

# Install production dependencies only
RUN npm ci

# Copy core application files
COPY .env* ./
COPY abis/ ./abis/
COPY src/ ./src/
COPY ponder-env.d.ts ./

# Build steps
RUN npm run codegen

EXPOSE 42069
CMD ["npm", "run", "start"]

# Run below docker cmd
# docker build --no-cache -t ponder-subgraph:latest .
# docker run -d -p 42069:42069 --name ponder ponder-subgraph:latest