FROM node:current

# Copy source
WORKDIR /build
COPY . .

# Build
RUN npm i -D
RUN ./node_modules/.bin/tsc

# Minimal prod image
FROM node:current-alpine
WORKDIR /app

COPY --from=0 /build/build .
COPY package*.json ./
RUN npm ci --only=production

CMD node app.js
