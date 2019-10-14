FROM node:current

# Copy source
WORKDIR /build
COPY . .

# Build
RUN npm i -D
RUN ./node_modules/.bin/tsc
RUN npm run swagger

# Test
RUN npm run test

# Minimal prod image
FROM node:current-alpine
WORKDIR /app

COPY --from=0 /build/build .
COPY --from=0 /build/static ./static
COPY --from=0 /build/swagger.json ./swagger.json
COPY package*.json ./

RUN npm ci --only=production

CMD npm run migrate && node app.js
