describe('poi map spec', () => {
  beforeEach(() => {
    cy.visit('/bookish-map') // Replace with the actual URL or route
  })

  const mapId = '#map'

  it('should display the map', () => {
    cy.get(mapId).should('be.visible')
  })

  it('should have search bar', () => {
    cy.get('.stadiamaps-search-box').should('be.visible')
  })

  it('should have map control zoom in', () => {
    cy.get('.maplibregl-ctrl-zoom-in').should('be.visible')
  })

  it('should have map control zoom out', () => {
    cy.get('.maplibregl-ctrl-zoom-out').should('be.visible')
  })

  it('should have map control compass', () => {
    cy.get('.maplibregl-ctrl-compass').should('be.visible')
  })

  it('should have map control compass', () => {
    cy.get('.maplibregl-ctrl-geolocate').should('be.visible')
  })

  it('should have sidebar items', () => {
    cy.get('.poi-sidebar-item', { timeout: 5000 })
    .should('have.length.at.least', 2)
  })

  it('should have legend items', () => {
    cy.get('.poi-legend-item').should('have.length.at.least', 3)
  })

  it('should only on legend items toggles', () => {
    cy.get('.poi-legend-item').each(($item) => {
      cy.wrap($item).find('.vue-toggles__text').should('have.text', 'On')
    })
  })

  it('list item count should be the same as items in the list', () => {
    cy.get('.poi-sidebar-item').then(($items) => {
      const itemCount = $items.length
      cy.get('.sidebar-item-count').should('have.text', `Points of Interest [${itemCount}]`)
    })
  })

})
