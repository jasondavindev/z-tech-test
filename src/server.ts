import 'reflect-metadata';
import { bootstrapMicroframework } from 'microframework-w3tec';

import { createLogger } from '@/decorators/Logger';
import express from '@/loaders/Express';
import typeorm from '@/loaders/Typeorm';

const logger = createLogger();

bootstrapMicroframework({
  loaders: [express, typeorm]
})
  .then(() => logger.info({ message: 'Application is running' }))
  .catch((error) => logger.error({ message: 'Application is crashed', stack: error.stack }));
