FROM golang:latest

EXPOSE 13109

ENV NODE_VER 8.5.0

# 1. Set working directory
# 2. Copy all file into the $GOPATH of the image
WORKDIR /go/src/github.com/MrHuxu/react-go-boilerplate
COPY . /go/src/github.com/MrHuxu/react-go-boilerplate

# Install external dependencies, mainly curl & supervisor
RUN \
  apt-get update -y && \
  apt-get install --no-install-recommends -y -q curl python build-essential git ca-certificates supervisor &&\
  rm -rf /var/lib/apt/lists/*

# 1. Install latest version of NodeJS
# 2. Add the executable file to $PATH
# 3. Compile the frontend source files
RUN mkdir /nodejs && curl http://nodejs.org/dist/v${NODE_VER}/node-v${NODE_VER}-linux-x64.tar.gz | tar xvzf - -C /nodejs --strip-components=1
ENV PATH $PATH:/nodejs/bin
RUN npm install && npm run webpack

# 1. Copy the supervisor configuration file into the image
# 2. Create the log directory
RUN mkdir /var/log/supervisor/react-go-boilerplate
COPY ./config/react-go-boilerplate.conf /etc/supervisor/conf.d

# 1. Install dependencies for Go server
# 2. Compile Go source files
RUN go get github.com/gin-gonic/gin
RUN go build main.go

ENTRYPOINT [ "supervisord", "-c", "/etc/supervisor/supervisord.conf" ]