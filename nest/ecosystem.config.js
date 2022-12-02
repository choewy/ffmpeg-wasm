module.exports = {
  apps: [
    {
      name: 'nest',
      script: 'dist/main.js',
      instances: '2',
      wait_ready: true,
      watch: true,
      listen_timeout: 10000,
      error_file: './logs/error.log',
      out_file: './logs/output.log',
      combine_logs: true,
    },
  ],
};
