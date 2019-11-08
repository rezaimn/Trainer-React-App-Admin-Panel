FROM node:10.16-alpine as react-build

WORKDIR /app

COPY ["./package-lock.json","./package.json", "/app/"]

RUN npm i

COPY . ./

RUN npm run build

FROM nginx:alpine as nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=react-build /app/build /usr/share/nginx/html
