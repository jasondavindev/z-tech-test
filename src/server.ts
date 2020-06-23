import 'reflect-metadata';
import { bootstrapMicroframework } from 'microframework-w3tec';

import { createLogger } from '@/decorators/logger';
import express from '@/loaders/express';
import typeorm from '@/loaders/typeorm';

const logger = createLogger();

bootstrapMicroframework({
  loaders: [express, typeorm]
})
  .then(() => logger.info({ message: 'Application is running' }))
  .catch((error) => logger.error({ message: 'Application is crashed', stack: error.stack }));
