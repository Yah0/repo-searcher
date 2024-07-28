import { module, test } from 'qunit';
import { setupTest } from 'repo-searcher/tests/helpers';

module('Unit | Service | github', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:github');
    assert.ok(service);
  });
});
