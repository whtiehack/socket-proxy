const proxy = require('./index');

const config = {
    remoteport: process.env.REMOTE_PORT,
    remoteip: process.env.REMOTE_HOST,
    listenport: process.env.LOCAL_LISTEN_PORT
};

const params = process.env.CONFIGS ? JSON.parse(process.env.CONFIGS) : {[process.env.PROXY_NAME]: config};

proxy.start(params);

