  describe('UI TESTS', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4200')
    });
    it('should load up the logo correctly', () => {
      cy.get('[data-cy="logo"]')
        .should('exist')
        .should('be.visible')
    });

    it('movie list button exists and visible', () => {
      cy.get('body')
        .find('.moviesButton')
        .should('exist')
        .and('be.visible')
        .and('be.enabled')
    });
    it('after click of movie list button should show a list', () => {
      cy.get('body').find('.moviesButton')
        .click()
        .get('[data-cy="movieTable"]')
        .should('exist')
        .and('be.visible')
    });
    it('should open the gif placeholder of video selected', () => {
      cy.get('body')
        .find('.moviesButton')
        .click()

      cy.get('[data-cy="movieTable"]')
        .find('[data-cy="movieTitle"]')
        .each(($element, index, $list) => {
          cy.wrap($element)
            .click()
            .get('[data-cy="placeholderGif"]')
            .should('exist')
            .and('be.visible')
        });
    });
  });

  describe('BACKEND TESTS', () => {
    let component;

    beforeEach(() => {
      cy.visit('http://localhost:4200')

      cy.window()
        .then((win) => {
          component = win['ng']['getComponent'](win.document.querySelector('app-plana-principal'));
        });
    });
    it('should check if socket variable is not null after initialization', () => {
      expect(component.socket)
        .to
        .not
        .be
        .null
    });
    it('should check if videoList is empty', () => {
      cy.get('[data-cy="movieButton"]')
        .click()
        .then(() => {
          expect(component.videoList)
            .to
            .have
            .length
            .gt(0);
        });
    });
    it('should check if variable showDiv is true after movieButton click', () => {
      cy.get('[data-cy="movieButton"]')
        .click()
        .then(() => {
          expect(component.showDiv)
            .to
            .be
            .true;
        });
    });
    it('should check if variable codi is not null or empty after requesting it from server, ' +
      'which triggers after clicking a video title', () => {
      cy.get('[data-cy="movieButton"]')
        .click();
      cy.get('[data-cy="movieTable"]')
        .find('[data-cy="movieTitle"]')
        .eq(0) //First element
        .click()
        .then(() => {
          expect(component.codi)
            .to.not.be.null
            .and
            .not.to.be.empty
        });
    });
    it('should check if object field video.opened is true after clicking title', () => {
      cy.get('[data-cy="movieButton"]')
        .click();
      cy.get('[data-cy="movieTable"]')
        .find('[data-cy="movieTitle"]')
        .eq(0)
        .click()
        .then(() => {
          cy.wait(1000);
          expect(component.videoList[0].opened)
            .to
            .be
            .true;
        });
    });
    it('should check if object field video.verified is true',  () =>  {
      let index = 0;
      cy.get('[data-cy="movieButton"]')
        .click();
      cy.get('[data-cy="movieTable"]')
        .find('[data-cy="movieTitle"]')
        .eq(index)
        .click()
        .then(() => {
          cy.wait(15000)
            .then(() => {
              expect(component.videoList[index].verified)
                .to
                .be
                .true
            });
        });
    });
  });
