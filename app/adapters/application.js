import RESTAdapter from '@ember-data/adapter/rest';
import { inject as service } from '@ember/service';

export default class ApplicationAdapter extends RESTAdapter {
  @service github;

  host = 'https://api.github.com';

  get headers() {
    return {
      Authorization: `token ${this.github.token}`,
    };
  }
}
