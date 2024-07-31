import { module, test } from 'qunit';
import { fillIn, visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'repo-searcher/tests/helpers';
import sinon from 'sinon';

module('Acceptance | fetch failed', function (hooks) {
  setupApplicationTest(hooks);
  let store;

  hooks.beforeEach(function () {
    store = this.owner.lookup('service:store');
  });

  test('failed to find repositories', async function (assert) {
    const nonExistingOrganisationName = 'nonExistingOrganisation';
    const testToken = 'testtoken123';

    sinon.stub(store, 'findRecord').throws(new Error('Record not found'));

    assert.expect(2);
    await visit('/');
    assert.dom('.form-container').exists('The form is loaded');
    await fillIn('#org', nonExistingOrganisationName);
    await fillIn('#token', testToken);
    await click('.submit-button');

    assert
      .dom('.error-info')
      .hasText(`We had trouble processing your request. Please try again.`);
  });

  hooks.afterEach(function () {
    store.findRecord.restore();
  });
});
