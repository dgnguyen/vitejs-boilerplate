FROM node:18.18.0 AS nodebuild
RUN mkdir -p /client-portal
WORKDIR /client-portal
COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY .env .
#RUN yarn install --network-timeout 1000000
RUN yarn install
COPY . .
RUN yarn build
FROM nginx:alpine
COPY --from=nodebuild /client-portal/dist /usr/share/nginx/html
# COPY default.conf /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80


# FROM node:18-alpine
# RUN mkdir -p /app
# WORKDIR /app
# COPY package.json .
# COPY yarn.lock .
# RUN yarn install
# COPY . .
# RUN yarn build
# EXPOSE 3000
# CMD [ "serve", "-s", "dist" ]
