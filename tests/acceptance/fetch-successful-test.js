import { module, test } from 'qunit';
import { fillIn, visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'repo-searcher/tests/helpers';
import sinon from 'sinon';
import Service from '@ember/service';
import EmberObject from '@ember/object';
import { A } from '@ember/array';

module('Acceptance | fetch repositories', function (hooks) {
  setupApplicationTest(hooks);
  let store;
  let fetchBranchesStub;

  hooks.beforeEach(function () {
    store = this.owner.lookup('service:store');

    const MockGithubService = Service.extend({
      fetchBranches: async () => [],
      setToken(token) {
        this.token = token;
      },
    });

    this.owner.register('service:github', MockGithubService);
    const githubService = this.owner.lookup('service:github');
    fetchBranchesStub = sinon.stub(githubService, 'fetchBranches');
  });

  test('fetch found repositories', async function (assert) {
    const organizationName = 'existingOrganisation';
    const token = 'testtoken123';
    const repoName1 = 'testName';
    const repoUrl1 = 'www.testUrl.com';
    const repoLanguage1 = 'testLanguage';
    const repoName2 = 'testName1';
    const repoUrl2 = 'www.testUrl1.com';
    const repoLanguage2 = 'testLanguage1';
    const branches1 = [{ id: 'main', name: 'main' }, { id: 'dev', name: 'dev' }];
    const branches2 = [{ id: 'main', name: 'main' }, { id: 'feature', name: 'feature' }];

    const testOrganization = EmberObject.create({
      id: organizationName,
      name: organizationName,
      repositories: A([
        EmberObject.create({
          id: '1',
          name: repoName1,
          owner: organizationName,
          htmlUrl: repoUrl1,
          language: repoLanguage1,
          isPrivate: false,
          branches: A(branches1),
        }),
        EmberObject.create({
          id: '2',
          name: repoName2,
          owner: organizationName,
          htmlUrl: repoUrl2,
          language: repoLanguage2,
          isPrivate: true,
          branches: A(branches2),
        }),
      ]),
    });

    fetchBranchesStub.withArgs(`${organizationName}/${repoName1}`).resolves(branches1);
    fetchBranchesStub.withArgs(`${organizationName}/${repoName2}`).resolves(branches2);

    sinon.stub(store, 'findRecord').resolves(testOrganization);

    assert.expect(9);

    await visit('/');
    assert.dom('.form-container').exists('The form is loaded');
    await fillIn('#org', organizationName);
    await fillIn('#token', token);
    assert.dom('.submit-button').exists();
    await click('.submit-button');

    assert.dom('.filters-form').exists('The filters container is loaded');
    assert.dom('.language-filter-name:first-child').hasText(repoLanguage1);

    assert.dom('.repositories').exists();
    assert.dom('.repo-name:first-child').hasText(repoName1);

    assert.dom('.branches-button').exists();
    await click('.branches-button');

    assert.dom('.branch-item').exists();
    assert.dom('.branch-item:first-child').hasText(branches1[0].name);
  });

  hooks.afterEach(function () {
    store.findRecord.restore();
    fetchBranchesStub.restore();
  });
});
