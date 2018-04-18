module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        // First application
        {
            name: "www",
            script: "bin/www",
            "node_args": "-harmony",
            "exec_interpreter": "babel-node",
            env: {
                COMMON_VARIABLE: "true"
            },
            env_production: {
                NODE_ENV: "production"
            },
            "instances": 1,
            "exec_mode": "cluster"
        }
    ],
    "ignore_watch": [
        "node_modules"
    ],
    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
        production: {
            key: "~/.ssh/id_rsa",
            user: "root",
            host: "192.168.9.26",
            ref: "origin/master",
            repo: "git@github.com:cissiesee/pm2demo.git",
            path: "/var/www/production",
            "post-deploy": "npm install && npm run reload:prod"
        },
        dev: {
            key: "~/.ssh/id_rsa",
            user: "root",
            host: "192.168.9.26",
            ref: "origin/master",
            repo: "git@github.com:cissiesee/pm2demo.git",
            path: "/var/www/development",
            "post-deploy": "npm install && npm run reload",
            env: {
                NODE_ENV: "dev"
            }
        }
    }
};
