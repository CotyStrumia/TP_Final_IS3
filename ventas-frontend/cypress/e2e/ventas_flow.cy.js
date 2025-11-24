/// <reference types="cypress" />

describe('Flujos completos de ventas (E2E)', () => {

  const mockProductos = [
    { id: 1, nombre: 'Producto A', precio: 100, stock: 10 },
    { id: 2, nombre: 'Producto B', precio: 50,  stock: 5  },
    { id: 3, nombre: 'Producto C', precio: 25,  stock: 8  },
    { id: 4, nombre: 'Producto D', precio: 75,  stock: 3  },
    { id: 5, nombre: 'Producto E', precio: 10,  stock: 2  }
  ]

  beforeEach(() => {

    // Mock login
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: { token: 'fake-jwt-token', rol: 'vendedor' }
    }).as('login')

    // Mock productos
    cy.intercept('GET', '**/productos', {
      statusCode: 200,
      body: mockProductos
    }).as('getProductos')

    // Mock POST ventas default (éxito)
    cy.intercept('POST', '**/ventas', {
      statusCode: 201,
      body: { mensaje: 'Venta registrada', id: 1 }
    }).as('postVenta')

    // Login
    cy.visit('/login')
    cy.get('input[placeholder="Email"]').type('vendedor@test.com')
    cy.get('input[placeholder="Password"]').type('password123')
    cy.contains('Ingresar').click()
    cy.wait('@login')

    // Ir a ventas
    cy.visit('/ventas')
    cy.contains('Registrar Venta', { timeout: 10000 }).should('be.visible')

    cy.wait('@getProductos')

    cy.get('select').first().should('be.visible')
    cy.get('select option').should('have.length.gt', 1)
  })

  function seleccionarPrimerProducto() {
    cy.get('select').first().select(mockProductos[0].id.toString())
    cy.get('input[type="number"]').first().should('not.be.disabled')
  }

  it('1️⃣ SIMPLE - Crear venta básica', () => {
    seleccionarPrimerProducto()
    cy.get('input[type="number"]').first().clear().type('1')
    cy.contains('Agregar al carrito').click()
    cy.contains('Producto A').should('exist')
  })

  it('🧪 Test alternativo', () => {
    seleccionarPrimerProducto()
    cy.get('input[type="number"]').first().clear().type('2')
    cy.contains('Agregar al carrito').click()
    cy.contains('Producto A').should('exist')
  })

  it('3️⃣ Valida stock insuficiente', () => {
    cy.get('select').first().select('2') // Producto B (stock 5)
    cy.get('input[type="number"]').first().clear().type('999')
    cy.contains('Agregar al carrito').click()
    cy.contains(/stock insuficiente|insuficiente/i).should('exist')
  })

  it('4️⃣ Elimina productos del carrito', () => {
    cy.reload()
    cy.wait('@getProductos')
    cy.contains('Registrar Venta').should('be.visible')

    // Asegurar que el checkbox de filtrar stock esté desmarcado
    cy.get('input[type="checkbox"]').uncheck()

    // Agregar primer producto
    cy.get('select').first().select('4') // Producto D
    cy.get('input[type="number"]').first().clear().type('1')
    cy.contains('Agregar al carrito').click()
    cy.get('table').contains('Producto D').should('exist')

    // Agregar segundo producto
    cy.get('select').first().select('5') // Producto E
    cy.get('input[type="number"]').first().clear().type('1')
    cy.contains('Agregar al carrito').click()
    cy.get('table').contains('Producto E').should('exist')

    // Eliminar el primero
    cy.get('table').contains('tr', 'Producto D').find('button[title="Eliminar"]').click()

    // Verificar que D ya no está pero E sigue
    cy.get('table').contains('Producto D').should('not.exist')
    cy.get('table').contains('Producto E').should('exist')
  })

  it('5️⃣ Muestra error sin productos', () => {
    cy.contains('Agregar al carrito').should('be.disabled')

    // Verificar que no existe botón de confirmar o está deshabilitado
    cy.get('body').then($body => {
      if ($body.find('button').filter((_, el) => /confirmar/i.test(el.textContent)).length > 0) {
        cy.contains('button', /confirmar/i).should('be.disabled')
      }
    })
  })

  it('6️⃣ Maneja errores del backend', () => {
    cy.reload()
    cy.wait('@getProductos')
    cy.contains('Registrar Venta').should('be.visible')

    // Asegurar que el checkbox de filtrar stock esté desmarcado
    cy.get('input[type="checkbox"]').uncheck()

    cy.get('select').first().select('5') // Producto E
    cy.get('input[type="number"]').first().clear().type('1')
    cy.contains('Agregar al carrito').click()

    cy.contains('Producto E').should('exist')

    // Mock error del backend
    cy.intercept('POST', '**/ventas', {
      statusCode: 500,
      body: { error: 'Error interno del servidor' }
    }).as('errVenta')

    // Botón flexible (💰 Confirmar Venta) - esperar a que esté habilitado
    cy.contains('button', /confirmar/i).should('be.visible').and('not.be.disabled').click()
    cy.wait('@errVenta')

    cy.contains(/error/i).should('exist')
    cy.contains('Producto E').should('exist')
  })

  it('7️⃣ Test básico', () => {
    seleccionarPrimerProducto()
    cy.get('input[type="number"]').first().clear().type('1')
    cy.contains('Agregar al carrito').click()
    cy.contains('Producto A').should('exist')
  })

})
