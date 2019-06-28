FROM node:11.15.0 AS node-builder

ENV NODE_ENV production

WORKDIR /work
COPY ./client /work/client
COPY ./package.json /work/
COPY ./package-lock.json /work/
COPY ./webpack.config.prd.js /work/

RUN npm install
RUN ./node_modules/webpack/bin/webpack.js --config webpack.config.prd.js

FROM golang:latest AS go-builder

ENV GO111MODULE on
ENV GOPROXY https://goproxy.io
ENV CGO_ENABLED 0

WORKDIR /work
COPY ./main.go /work/
COPY ./server /work/server
COPY ./go.mod /work/
COPY ./go.sum /work/

RUN go mod download
RUN go build main.go

FROM scratch

ENV NODE_ENV production
ENV GIN_MODE release
ENV INSIDE_DOCKER true

WORKDIR /output
COPY ./config/config.json /output/config/
COPY ./server/web/templates /output/server/web/templates
COPY --from=node-builder /work/server/public /output/server/public
COPY --from=go-builder /work/main /output/

EXPOSE 13109
ENTRYPOINT [ "./main" ]
