/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="cypress" />

import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import { GANTT_VIS_NAME, Y_LABEL, X_LABEL, DEFAULT_SIZE } from '../utils/constants';
dayjs.extend(customParseFormat);

describe('Dump test data', () => {
  it('Indexes test data for gantt chart', () => {
    const dumpDataSet = (ndjson, index) =>
      cy.request({
        method: 'POST',
        form: false,
        url: 'api/console/proxy',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          'osd-xsrf': true,
        },
        qs: {
          path: `${index}/_bulk`,
          method: 'POST',
        },
        body: ndjson,
      });
    cy.fixture('jaeger-sample.txt').then((ndjson) => {
      dumpDataSet(ndjson, 'jaeger');
    });

    cy.request({
      method: 'POST',
      failOnStatusCode: false,
      url: 'api/saved_objects/index-pattern/jaeger',
      headers: {
        'content-type': 'application/json',
        'osd-xsrf': true,
      },
      body: JSON.stringify({ attributes: { title: 'jaeger' } }),
    });
  });
});

describe('Save a gantt chart', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('opensearchDashboards')}/app/visualize#`);
  });

  it('Creates and saves a gantt chart', () => {
    cy.get('.euiButton__text').contains('Create ').click({ force: true });
    cy.get('[data-test-subj="visTypeTitle"]').contains('Gantt Chart').click({ force: true });
    cy.contains(/^jaeger$/).click({ force: true });
    cy.contains('Save').click({ force: true });
    cy.get('input[data-test-subj="savedObjectTitle"]').type(GANTT_VIS_NAME);
    cy.get('button[data-test-subj="confirmSaveSavedObjectButton"]').click({
      force: true,
    });

    cy.contains('Saved').should('exist');
  });
});

describe('Render and configure a gantt chart', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('opensearchDashboards')}/app/visualize#`);
    cy.contains(GANTT_VIS_NAME).click({ force: true });
  });

  it('Renders no data message', () => {
    cy.contains('No data').should('exist');
  });

  it('Renders the chart', () => {
    cy.get('button[data-test-subj="gantt-chart-editor-label-field"]').click();
    cy.get('.euiContextMenuItem__text')
      .contains(/^spanID$/)
      .click();
    cy.get('button[data-test-subj="gantt-chart-editor-start-time-field"]').click();
    cy.get('.euiContextMenuItem__text')
      .contains(/^startTime$/)
      .click();
    cy.get('button[data-test-subj="gantt-chart-editor-duration-field"]').click();
    cy.get('.euiContextMenuItem__text')
      .contains(/^duration$/)
      .click();
    cy.get('.euiButton__text').contains('Update').click({ force: true });

    cy.get('.traces').should('have.length', DEFAULT_SIZE);

    cy.get('.euiButton__text').contains('Save').click({ force: true });
    cy.get('button[data-test-subj="confirmSaveSavedObjectButton"]').click({
      force: true,
    });
  });
});

describe('Configure panel settings', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('opensearchDashboards')}/app/visualize#`);
    cy.contains(GANTT_VIS_NAME).click({ force: true });
    cy.contains('Panel settings').click({ force: true });
  });

  it('Changes y-axis label', () => {
    cy.get('input.euiFieldText[placeholder="Label"]').eq(0).focus().type(Y_LABEL);
    cy.get('.euiButton__text').contains('Update').click({ force: true });

    cy.get('text.ytitle').contains(Y_LABEL).should('exist');

    cy.get('.euiSwitch__label').contains('Show Y-axis label').click({ force: true });
    cy.get('.euiButton__text').contains('Update').click({ force: true });

    cy.get('text.ytitle').should('not.exist');
  });

  it('Changes x-axis label', () => {
    cy.get('input.euiFieldText[placeholder="Label"]').eq(1).focus().type(X_LABEL);
    cy.get('.euiButton__text').contains('Update').click({ force: true });

    cy.get('text.xtitle').contains(X_LABEL).should('exist');

    cy.get('.euiSwitch__label').contains('Show X-axis label').click({ force: true });
    cy.get('.euiButton__text').contains('Update').click({ force: true });

    cy.get('text.xtitle').should('not.exist');
  });

  it('Changes time formats', () => {
    cy.intercept({ method: 'POST', url: '**/api/gantt_vis/query' }).as('timeUpdateRequest');

    cy.get('select').eq(3).select('MM/DD hh:mm:ss A');
    cy.get('.euiButton__text').contains('Update').click({ force: true });
    cy.wait('@timeUpdateRequest');
    cy.get('.xtick')
      .eq(0)
      .invoke('text')
      .should('satisfy', (text) => {
        return dayjs(text, 'MM/DD hh:mm:ss A', true).isValid();
      });

    cy.get('select').eq(3).select('MM/DD/YY hh:mm A');
    cy.get('.euiButton__text').contains('Update').click({ force: true });
    cy.wait('@timeUpdateRequest');
    cy.get('.xtick')
      .eq(0)
      .invoke('text')
      .should('satisfy', (text) => {
        return dayjs(text, 'MM/DD/YY hh:mm A', true).isValid();
      });

    cy.get('select').eq(3).select('HH:mm:ss.SSS');
    cy.get('.euiButton__text').contains('Update').click({ force: true });
    cy.wait('@timeUpdateRequest');
    cy.get('.xtick')
      .eq(0)
      .invoke('text')
      .should('satisfy', (text) => {
        return dayjs(text, 'HH:mm:ss.SSS', true).isValid();
      });

    cy.get('select').eq(3).select('MM/DD HH:mm:ss');
    cy.get('.euiButton__text').contains('Update').click({ force: true });
    cy.wait('@timeUpdateRequest');
    cy.get('.xtick')
      .eq(0)
      .invoke('text')
      .should('satisfy', (text) => {
        return dayjs(text, 'MM/DD HH:mm:ss', true).isValid();
      });

    cy.get('select').eq(3).select('MM/DD/YY HH:mm');
    cy.get('.euiButton__text').contains('Update').click({ force: true });
    cy.wait('@timeUpdateRequest');
    cy.get('.xtick')
      .eq(0)
      .invoke('text')
      .should('satisfy', (text) => {
        return dayjs(text, 'MM/DD/YY HH:mm', true).isValid();
      });
  });

  it('Hides legends', () => {
    cy.get('g.traces').should('have.length', DEFAULT_SIZE);

    cy.get('.euiSwitch__label').contains('Show legend').click({ force: true });
    cy.get('.euiButton__text').contains('Update').click({ force: true });

    cy.get('g.traces').should('not.exist');
  });
});

describe('Add gantt chart to dashboard', () => {
  it('Adds gantt chart to dashboard', () => {
    cy.visit(`${Cypress.env('opensearchDashboards')}/app/dashboards#/create`);

    cy.contains('Add an existing').click({ force: true });
    cy.get('input[data-test-subj="savedObjectFinderSearchInput"]').focus().type(GANTT_VIS_NAME);
    cy.get(`.euiListGroupItem__label[title="${GANTT_VIS_NAME}"]`).click({
      force: true,
    });

    cy.get('g.traces').should('have.length', DEFAULT_SIZE);
  });
});
