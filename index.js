/**
 * Created by mac on 16/5/19.
 */

var net = require('net');
var config = require('./config.json');

var CONFIG_FIELD = {
    REMOTEIP:'remoteip',
    REMOTEPORT:'remoteport',
    LISTENPORT:'listenport'
};


//start all proxy
for(var k in config){
    startProxy(k,config[k]);
}






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
            remote.end();
        });
        client.on('data',function(chunk){
            remote.write(chunk);
        });
        client.on('error',function(err){
            error('client error:',client.remoteAddress,err);
            remote.destroy();
        });

        //proxy client
        remote = net.connect({port:config[CONFIG_FIELD.REMOTEPORT],host:config[CONFIG_FIELD.REMOTEIP]},function(err){
            info('remote connected:??:',err);
        });
        remote.on('end',function(arg){
            warn('remote end!~:',client.remoteAddress);
            client.end();
        });
        remote.on('data',function(chunk){
            client.write(chunk);
        });
        remote.on('error',function(err){
            error('remote error!~:',client.remoteAddress,err);
            client.destroy();
        });


    });


    server.listen(config[CONFIG_FIELD.LISTENPORT],function(err){
        if(err){
            error('listen porterror:'+config[CONFIG_FIELD.LISTENPORT]);
        }else{
            info('listen port:'+config[CONFIG_FIELD.LISTENPORT]+' success!!');
        }
    });
}