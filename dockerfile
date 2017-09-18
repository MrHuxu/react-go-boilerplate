FROM golang:latest

EXPOSE 13109
WORKDIR $GOPATH/src/github.com/MrHuxu/react-go-boilerplate

COPY . $GOPATH/src/github.com/MrHuxu/react-go-boilerplate

ENV NODE_VER 8.5.0

RUN apt-get update -y && apt-get install --no-install-recommends -y -q curl python build-essential git ca-certificates
RUN mkdir /nodejs && curl http://nodejs.org/dist/v${NODE_VER}/node-v${NODE_VER}-linux-x64.tar.gz | tar xvzf - -C /nodejs --strip-components=1

ENV PATH $PATH:/nodejs/bin
RUN npm install
RUN npm run webpack


RUN go get github.com/gin-gonic/gin
RUN go build main.go