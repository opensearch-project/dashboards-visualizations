/*
 *   Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

/// <reference types="cypress" />

import { delay, GANTT_VIS_NAME, Y_LABEL, X_LABEL, DEFAULT_SIZE } from '../utils/constants';

describe('Save a gantt chart', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('opensearchDashboards')}/app/visualize#`);
    cy.wait(delay * 5);
  });

  it('Creates and saves a gantt chart', () => {
    cy.get('.euiButton__text').contains('Create ').click({ force: true });
    cy.wait(delay * 3);
    cy.get('span[data-test-subj="visTypeTitle"]').contains('Gantt Chart').click({ force: true });
    cy.wait(delay * 3);
    cy.get('.euiListGroupItem__label')
      .contains(/^jaeger$/)
      .click({ force: true });
    cy.wait(delay * 3);
    cy.get('.euiButton__text').contains('Save').click({ force: true });
    cy.wait(delay);
    cy.get('input[data-test-subj="savedObjectTitle"]').type(GANTT_VIS_NAME);
    cy.wait(delay);
    cy.get('button[data-test-subj="confirmSaveSavedObjectButton"]').click({ force: true });
    cy.wait(delay * 3);

    cy.get('.euiToastHeader__title').contains('Saved').should('exist');
  });
});

describe('Render and configure a gantt chart', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('opensearchDashboards')}/app/visualize#`);
    cy.wait(delay * 5);
    cy.get('button').contains(GANTT_VIS_NAME).click({ force: true });
    cy.wait(delay * 5);
  });

  it('Renders no data message', () => {
    cy.get('.euiTitle').contains('No data').should('exist');
  });

  it('Renders the chart', () => {
    cy.get('button.euiSuperSelectControl').eq(0).click({ force: true });
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text')
      .contains(/^spanID$/)
      .click({ force: true });
    cy.wait(delay);
    cy.get('button.euiSuperSelectControl').eq(1).click({ force: true });
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text')
      .contains(/^startTime$/)
      .click({ force: true });
    cy.wait(delay);
    cy.get('button.euiSuperSelectControl').eq(2).click({ force: true });
    cy.wait(delay);
    cy.get('.euiContextMenuItem__text')
      .contains(/^duration$/)
      .click({ force: true });
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Update').click({ force: true });
    cy.wait(delay);

    cy.get('.traces').should('have.length', DEFAULT_SIZE);

    cy.get('.euiButton__text').contains('Save').click({ force: true });
    cy.wait(delay);
    cy.get('button[data-test-subj="confirmSaveSavedObjectButton"]').click({ force: true });
    cy.wait(delay * 3);
  });
});

describe('Configure panel settings', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('opensearchDashboards')}/app/visualize#`);
    cy.wait(delay * 5);
    cy.get('button').contains(GANTT_VIS_NAME).click({ force: true });
    cy.wait(delay * 5);
    cy.get('.euiTab__content').contains('Panel settings').click({ force: true });
    cy.wait(delay);
  });

  it('Changes y-axis label', () => {
    cy.get('input.euiFieldText[placeholder="Label"]').eq(0).focus().type(Y_LABEL);
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Update').click({ force: true });
    cy.wait(delay);

    cy.get('text.ytitle').contains(Y_LABEL).should('exist');

    cy.get('.euiSwitch__label').contains('Show Y-axis label').click({ force: true });
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Update').click({ force: true });
    cy.wait(delay);

    cy.get('text.ytitle').should('not.exist');
  });

  it('Changes x-axis label', () => {
    cy.get('input.euiFieldText[placeholder="Label"]').eq(1).focus().type(X_LABEL);
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Update').click({ force: true });
    cy.wait(delay);

    cy.get('text.xtitle').contains(X_LABEL).should('exist');

    cy.get('.euiSwitch__label').contains('Show X-axis label').click({ force: true });
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Update').click({ force: true });
    cy.wait(delay);

    cy.get('text.xtitle').should('not.exist');
  });

  it('Changes time formats', () => {
    cy.get('g.xtick > text').contains('12:59:07.303 PM').should('exist');

    cy.get('select').eq(3).select('MM/DD hh:mm:ss A');
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Update').click({ force: true });
    cy.wait(delay);
    cy.get('g.xtick > text').contains('05/28 12:59:07 PM').should('exist');

    cy.get('select').eq(3).select('MM/DD/YY hh:mm A');
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Update').click({ force: true });
    cy.wait(delay);
    cy.get('g.xtick > text').contains('05/28/20 12:59 PM').should('exist');

    cy.get('select').eq(3).select('HH:mm:ss.SSS');
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Update').click({ force: true });
    cy.wait(delay);
    cy.get('g.xtick > text').contains('12:59:07.303').should('exist');

    cy.get('select').eq(3).select('MM/DD HH:mm:ss');
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Update').click({ force: true });
    cy.wait(delay);
    cy.get('g.xtick > text').contains('05/28 12:59:07').should('exist');

    cy.get('select').eq(3).select('MM/DD/YY HH:mm');
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Update').click({ force: true });
    cy.wait(delay);
    cy.get('g.xtick > text').contains('05/28/20 12:59').should('exist');
  });

  it('Hides legends', () => {
    cy.get('g.traces').should('have.length', DEFAULT_SIZE);

    cy.get('.euiSwitch__label').contains('Show legend').click({ force: true });
    cy.wait(delay);
    cy.get('.euiButton__text').contains('Update').click({ force: true });
    cy.wait(delay);

    cy.get('g.traces').should('not.exist');
  });
});

describe('Add gantt chart to dashboard', () => {
  it('Adds gantt chart to dashboard', () => {
    cy.visit(`${Cypress.env('opensearchDashboards')}/app/dashboards#/create`);
    cy.wait(delay * 5);

    cy.get('.euiLink').contains('Add an existing').click({ force: true });
    cy.wait(delay);
    cy.get('input[data-test-subj="savedObjectFinderSearchInput"]').focus().type(GANTT_VIS_NAME);
    cy.wait(delay);
    cy.get(`.euiListGroupItem__label[title="${GANTT_VIS_NAME}"]`).click({ force: true });
    cy.wait(delay);

    cy.get('g.traces').should('have.length', DEFAULT_SIZE);
  });
});
