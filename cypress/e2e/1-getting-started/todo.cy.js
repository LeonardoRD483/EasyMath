
describe('app login', () => {
  before(() => {
    cy.visit('http://localhost:4200/auth/login')
  });

  it('click button login ', function () {
    cy.wait(500);
    cy.get('.text-primary').first().click({force: true})
  });

  it('insert credentials inputs', () => {
    cy.get('#first_name').type('Juan4');
    cy.get('#last_name').type('Perez4');
    cy.get('#school').select('DB');
    cy.get('#username').type('Juan4');
    cy.get('#email').type('leo4@gmail.com');
    cy.get('#password').type('123456');
    cy.get('#repeat_password').type('123456');
  });


  it('click button login ', function () {
    cy.wait(500);
    cy.get('.register-btn').first().click({force: true})
  })

  it('click button login ', function () {
    cy.wait(500);
    cy.get('.popUp').first().click({force: true})
  })

  it('insert credentials inputs', () => {
    cy.get('#email').type('leo1@gmail.com');
    cy.get('#password').type('123456');
  });

  it('click button login ', function () {
    cy.wait(500);
    cy.get('.login-btn').first().click({force: true})
  });

  it('check url after login', () => {
    cy.url()
      .should('be.equal', 'http://localhost:4200/student/area')
  })
});

describe('length == 5', () => {

  it('check the number of bulletins loaded at startup', () => {
    cy.wait(1000)
    cy.get('.card-area').children().should('have.length', 5)
  })
});


describe('--- entrar a sector de area ---', () => {
  it('click button area suma ', function () {
    cy.wait(1000)
    cy.get('.text-center').first().click({force: true})
  });

  it('check url after area', () => {
    cy.wait(1000)
    cy.url()
      .should('be.equal', 'http://localhost:4200/student/area/suma')
  })
});



