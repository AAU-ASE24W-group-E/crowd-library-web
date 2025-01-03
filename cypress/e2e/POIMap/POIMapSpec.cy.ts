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
    cy.get('.poi-sidebar-item').should('have.length.at.least', 2)
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

  // it('should open a popup when a POI is clicked', () => {
  //   // Zoom into the map and click on a POI marker
  //   cy.window().then((win) => {
  //     const map = win.__map__;
  //     map.setZoom(14);
  //   });

  //   cy.get('.maplibregl-marker')
  //     .first()
  //     .click();

  //   // Verify the popup is displayed
  //   cy.get('.maplibregl-popup').should('be.visible');
  // });

  // it('should filter POIs based on legend selection', () => {
  //   // Simulate selecting a type in the legend
  //   cy.get('.legend-item') // Replace with the selector for legend items
  //     .first()
  //     .click();

  //   // Verify the map updates to show only the selected POIs
  //   cy.window().then((win) => {
  //     const map = win.__map__;
  //     const filteredPOIs = map.queryRenderedFeatures({ layers: ['poi-layer'] });
  //     expect(filteredPOIs.length).to.be.greaterThan(0);
  //   });
  // });

  // it('should reset POIs when zoomed out below threshold', () => {
  //   // Zoom out below the threshold
  //   cy.window().then((win) => {
  //     const map = win.__map__;
  //     map.setZoom(8);
  //   });

  //   // Verify POIs are cleared
  //   cy.window().then((win) => {
  //     const map = win.__map__;
  //     const visiblePOIs = map.queryRenderedFeatures({ layers: ['poi-layer'] });
  //     expect(visiblePOIs.length).to.equal(0);
  //   });
  // });

  // it('should search for a location and focus the map', () => {
  //   // Interact with the search box and enter a query
  //   cy.get('.maplibregl-control-container input') // Replace with the selector for the search input
  //     .type('Library{enter}');

  //   // Wait for the map to update and verify the map center has changed
  //   cy.window().then((win) => {
  //     const map = win.__map__;
  //     cy.wrap(map).its('getCenter').should((center) => {
  //       expect(center.lng).not.to.equal(14.26492);
  //       expect(center.lat).not.to.equal(46.616308);
  //     });
  //   });
  // });

  // it('should close all popups on close action', () => {
  //   // Open multiple popups by clicking on markers
  //   cy.get('.maplibregl-marker')
  //     .each((marker) => {
  //       cy.wrap(marker).click();
  //     });

  //   // Trigger the action to close all popups
  //   cy.get('.close-popups-btn') // Replace with the selector for the button
  //     .click();

  //   // Verify no popups are visible
  //   cy.get('.maplibregl-popup').should('not.exist');
  // });
})
