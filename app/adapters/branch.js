import RESTAdapter from '@ember-data/adapter/rest';
import { inject as service } from '@ember/service';

export default class BranchAdapter extends RESTAdapter {
  @service github;

  get headers() {
    return {
      Authorization: `token ${this.github.token}`,
      Accept: 'application/vnd.github+json',
    };
  }

  urlForQuery(query) {
    const { fullName } = query;
    delete query.fullName;
    return `https://api.github.com/repos/${fullName}/branches`;
  }
}
