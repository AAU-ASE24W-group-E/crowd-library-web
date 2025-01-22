describe('Book Search and Import Component', () => {
    beforeEach(() => {
      cy.visit('/my-books'); 
      cy.get('.add-book-btn').click();
    });
  
    it('should display the search bar', () => {
      cy.get('#search-input').should('be.visible');
    });
  
    it('should display a message when no search results are found', () => {
      const invalidSearchQuery = 'nonexistentbook';
  
      cy.get('#search-input').type(`${invalidSearchQuery}{enter}`);
      cy.get('.BookEntry').should('not.exist');
    });
  
    it('should display the ISBN input field', () => {
      cy.get('#isbn-input').should('be.visible');
    });
  
    it('should show a warning when ISBN field is empty and import is attempted', () => {
      cy.get('.import-btn').click();
      cy.contains('Please enter an ISBN.').should('be.visible');
    });
  
    it('should attempt to import a book when a valid ISBN is provided', () => {
      const validIsbn = '9780670022410'; 
      cy.get('#isbn-input').type(validIsbn);
      cy.get('.import-btn').click();
      cy.contains('We are trying to import the book.').should('be.visible');
    });
  
   
  });
  