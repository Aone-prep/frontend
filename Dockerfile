FROM node:16.15.1-bullseye
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
CMD ["npm", "start"]