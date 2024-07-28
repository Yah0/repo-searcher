import { setupTest } from 'repo-searcher/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Model | repository', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('repository', {});
    assert.ok(model, 'model exists');
  });
});
