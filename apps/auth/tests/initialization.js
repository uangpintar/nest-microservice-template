// modules libs env and mocks initialization

process.env.MONGODB_URI =
  'mongodb+srv://michael:copycino1@cluster0.pytjn.mongodb.net/?retryWrites=true&w=majority';
process.env.PORT = 3001;

process.env.RABBIT_MQ_URI = 'amqp://rabbitmq:5672';
process.env.RABBIT_MQ_AUTH_QUEUE = 'auth';

jest.spyOn(process, 'exit').mockReturnValue(true);
