
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
  }
}

```


## Installation

```bash
npm install socket-proxy --save
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