import { setupTest } from 'repo-searcher/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Adapter | organization', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const adapter = this.owner.lookup('adapter:organization');
    assert.ok(adapter, 'adapter exists');
  });
});
