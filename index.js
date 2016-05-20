/**
 * Created by mac on 16/5/19.
 */

var net = require('net');
var config = require('./config.json');


startProxy('mysql',config.mysql);







function startProxy(name,config){
    function info(message){
        message = '\x1b[32m['+ new Date().toLocaleString() +']\x1b[m '+name+':info '+message;
        console.log.apply(console,arguments);
    }
    function warn(message){
        message = '\x1b[33m['+ new Date().toLocaleString() +']\x1b[m '+name+':warn '+message;
        console.log.apply(console,arguments);
    }
    function debug(message){
        message = '\x1b[36m['+ new Date().toLocaleString() +']\x1b[m '+name+':debug '+message;
        console.log.apply(console,arguments);
    }
    function error(message){
        message = '\x1b[31m['+ new Date().toLocaleString() +']\x1b[m '+name+':error '+message;
        console.log.apply(console,arguments);
    }

    var server = net.createServer(/** @param {Socket}client**/function(client){
        var remote;
        info('client connected:',client.remoteAddress);
        client.on('end',function(){
            debug('client disconnected!',client.remoteAddress);
        });
        client.on('data',function(chunk){
            remote.write(chunk);
        });
        client.on('error',function(err){
            error('client error:',client.remoteAddress,err);
            remote.destroy();
        });

        //proxy client
        remote = net.connect({port:config.remoteport,host:config.remoteip},function(err){
            info('remote connected:??:',err);
        });
        remote.on('end',function(err){
            error('remote error!~:',client.remoteAddress,err);
            client.destroy();
        });
        remote.on('data',function(chunk){
            client.write(chunk);
        });
        remote.on('error',function(err){
            error('remote error!~:',client.remoteAddress,err);
            client.destroy();
        });


    });


    server.listen(config.listenport,function(err){
        if(err){
            error('listen porterror:'+config.listenport);
        }else{
            info('listen port:'+config.listenport+' success!!');
        }
    });
}