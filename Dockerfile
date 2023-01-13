# syntax=docker/dockerfile:1
#stage 1
# FROM node:latest as node
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build --prod

#stage 2
FROM golang:1.17-alpine
ENV GO111MODULE=on
WORKDIR /app
ADD go-backend/ ./
RUN go mod download
RUN ls cmd/natsui 
RUN go build cmd/natsui/main.go
EXPOSE 8080
CMD ["/app/main"]