import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'node:util';

(globalThis as any).TextEncoder = TextEncoder;
(globalThis as any).TextDecoder = TextDecoder;

// MSW correcto - con manejo de errores
try {
  const { server } = require('./src/mocks/server');
  
  // @ts-ignore - Jest globals
  beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
  // @ts-ignore - Jest globals
  afterEach(() => server.resetHandlers());
  // @ts-ignore - Jest globals
  afterAll(() => server.close());
} catch (e: unknown) {
  console.warn('MSW server not available, tests will use mocks', e);
}
