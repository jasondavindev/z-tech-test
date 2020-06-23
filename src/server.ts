import 'reflect-metadata';
import { bootstrapMicroframework } from 'microframework-w3tec';

import express from '@/loaders/express';
import typeorm from '@/loaders/typeorm';

bootstrapMicroframework({
  loaders: [express, typeorm]
})
  .then(() => console.info({ message: 'Application is running' }))
  .catch((error) => console.error({ message: 'Application is crashed', stack: error.stack }));
