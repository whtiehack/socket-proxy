
# Socket proxy

## Description
socket agent! proxy. support custom setting

support any tcp protocol!  e.g. http https ssh ftp

### simple config.json
```
{
  "you custom name":{   //this name can custom
    "remoteip":"127.0.0.1", // remote host
    "remoteport":3306,      // remote port
    "listenport":3333       // listen port
  },
  "you custom name 2":{   //this name can custom
    "remoteip":"127.0.0.1", // remote host
    "remoteport":6379,      // remote port
    "listenport":6378       // listen port
  },
  ...
}

```


## Installation

```bash
npm install socket-proxy --save
```


## Docker

```
docker pull smallwhite/socket-proxy
docker run --network host -e REMOTE_PORT=3006 -e REMOTE_HOST=127.0.0.1 -e LOCAL_LISTEN_PORT=3005 -d smallwhite/socket-proxy

// or  full configs
docker run --network host -e CONFIGS="{\"you custom name\":{\"remoteip\":\"127.0.0.1\",\"remoteport\":3306,\"listenport\":3333},\"you custom name 2\":{\"remoteip\":\"127.0.0.1\",\"remoteport\":6379,\"listenport\":6378}}" -d smallwhite/socket-proxy

// or edit you self compose

docker-compose up
```


## Usage

```javascript
var proxy = require('socket-proxy');

proxy.start({
              "you custom name":{   //this name can custom
                "remoteip":"127.0.0.1", // remote host
                "remoteport":3306,      // remote port
                "listenport":3333       // listen port
              }
            });
```


## Test you proxy

```javascript
var net  = require('net');
var client = net.connect({port:3333},function(err){
    client.write('hello~');
});
```


## LICENSE

(ISC License)