import { setupServer } from 'msw/node';
import { handlers } from './handlers';
export const server = setupServer(...handlers);
// Encender MSW antes de todos los tests
beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
// Resetear handlers entre tests
afterEach(() => server.resetHandlers());
// Apagar MSW al finalizar
afterAll(() => server.close());
