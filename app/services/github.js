import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class GithubService extends Service {
  @tracked token;
  @service store;

  setToken(token) {
    this.token = token;
  }

  async fetchBranches(fullName) {
    return await this.store.query('branch', { fullName });
  }
}
