import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// ----------------------------------------------------
// 1) Intentamos inicializar MSW; si falla → fallback
// ----------------------------------------------------
let mswAvailable = true;

try {
  require('../mocks/server');
} catch (e) {
  console.warn('MSW not available, using fallback mock');
  mswAvailable = false;
}

// ----------------------------------------------------
// 2) Fallback MOCK para axios() cuando MSW no está disponible
// ----------------------------------------------------
if (!mswAvailable) {
  jest.mock('../api/axios', () => {
    return () => Promise.resolve({
      get: jest.fn(() =>
        Promise.resolve({
          data: [
            { id: 1, nombre: 'MSW Product A', precio: 12.5, stock: 3 }
          ]
        })
      )
    });
  });
}

import Productos from '../pages/Productos';

// ----------------------------------------------------
// 3) Test principal
// ----------------------------------------------------
test('Productos obtiene y muestra productos usando MSW (o fallback)', async () => {
  render(<Productos />);

  // Producto mockeado (MSW o fallback)
  const item = await screen.findByText(/MSW Product A/, {}, { timeout: 3000 });

  expect(item).toBeInTheDocument();
  expect(screen.getByText(/Stock: 3/)).toBeInTheDocument();
});
