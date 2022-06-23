// modules libs env and mocks initialization

process.env.RABBIT_MQ_URI = 'amqp://rabbitmq:5672';
process.env.RABBIT_MQ_BILLING_QUEUE = 'billing';
process.env.RABBIT_MQ_AUTH_QUEUE = 'auth';

jest.spyOn(process, 'exit').mockReturnValue(true);
