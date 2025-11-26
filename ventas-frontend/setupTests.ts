import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'node:util';

(globalThis as any).TextEncoder = TextEncoder;
(globalThis as any).TextDecoder = TextDecoder;

// MSW correcto - con manejo de errores
try {
  const { server } = require('./src/mocks/server');
  
  beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
} catch (e) {
  console.warn('MSW server not available, tests will use mocks');
}
