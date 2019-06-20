module.exports = {
  apps : [{
    name: 'Messaging_API',
    script: 'main.ts',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 4,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '159.203.120.35',
      ref  : 'origin/master',
      port: 5000,
      repo : 'https://gitlab.com/solutechlimited/satmessaging.git',
      path : '/api/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    development : {
      user : 'node',
      host : '159.203.120.35',
      ref  : 'origin/dev',
      repo : 'https://gitlab.com/solutechlimited/satmessaging.git',
      path : '/api/development',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env development'
    }
  }
};
