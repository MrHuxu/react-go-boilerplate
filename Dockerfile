FROM golang:latest

EXPOSE 13109

ENV NODE_VER 8.7.0
ENV GIN_MODE release
ENV INSIDE_DOCKER true

RUN go get github.com/gin-gonic/gin
RUN apt-get update -y && \
  apt-get install --no-install-recommends -y -q curl python build-essential git ca-certificates

RUN mkdir /nodejs && curl http://nodejs.org/dist/v${NODE_VER}/node-v${NODE_VER}-linux-x64.tar.gz | tar xvzf - -C /nodejs --strip-components=1
ENV PATH $PATH:/nodejs/bin

WORKDIR /go/src/github.com/MrHuxu/react-go-boilerplate

COPY . /go/src/github.com/MrHuxu/react-go-boilerplate
RUN npm install && npm run webpack
RUN go build main.go

ENTRYPOINT [ "./main" ]
