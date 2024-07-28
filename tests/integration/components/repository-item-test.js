import { module, test } from 'qunit';
import { setupRenderingTest } from 'repo-searcher/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | repository-item', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<RepositoryItem />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <RepositoryItem>
        template block text
      </RepositoryItem>
    `);

    assert.dom().hasText('template block text');
  });
});
