module.exports = {
  apps : [{
    name: 'API',
    script: 'server.js',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    instances: 'max',
    autorestart: true,
    watch: true,
    exec_mode: 'cluster',
  }]
};
