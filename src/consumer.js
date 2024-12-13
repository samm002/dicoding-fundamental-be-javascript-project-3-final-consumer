require('dotenv').config();
const amqp = require('amqplib');

const config = require('./utils/config');
const PlaylistSongService = require('./services/playlist_songsService');
const MailSender = require('./services/mailSenderService');
const Listener = require('./services/messageBrokerListenerService');

const init = async () => {
  const playlistSongService = new PlaylistSongService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistSongService, mailSender);

  const connection = await amqp.connect(config.rabbitMq.server);
  const channel = await connection.createChannel();

  console.log('RabbitMQ server connection success');

  const queue = await channel.assertQueue(`${config.rabbitMq.queueName}`, {
    durable: true,
  });

  console.log(`Initializing queue : "${queue.queue}" success`);

  channel.consume(queue.queue, listener.listen, { noAck: true });

  console.log(`Consuming queue : "${queue.queue}"`);
};

init();
