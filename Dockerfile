# syntax=docker/dockerfile:1
#stage 1
FROM node:18.10.0 as node
WORKDIR /app
COPY ng-frontend/nats-ui .
RUN npm install
RUN npm run build --prod

#stage 2
FROM golang:1.17-alpine as go
ENV GO111MODULE=on
WORKDIR /app
ADD go-backend/ ./
RUN go mod download
RUN ls cmd/natsui 
RUN go build cmd/natsui/main.go


#stage 3
FROM alpine
WORKDIR /app
COPY --from=node /app/dist/nats-ui /app/dist/nats-ui
COPY --from=go /app .
EXPOSE 8080
CMD ["/app/main"]