const config = {
  database: {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    databaseName: process.env.PGDATABASE,
    port: process.env.PGPORT || 5432,
  },
  rabbitMq: {
    server: process.env.RABBITMQ_SERVER,
    queueName: process.env.QUEUE_NAME,
  },
};

module.exports = config;
