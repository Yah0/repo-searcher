import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

export default class GithubService extends Service {
  @tracked token;

  setToken(token) {
    this.token = token;
  }

  async fetchBranches(fullName) {
    let response = await fetch(
      `https://api.github.com/repos/${fullName}/branches`,
      {
        headers: {
          Authorization: `token ${this.token}`,
          Accept: 'application/vnd.github+json',
        },
      },
    );
    return await response.json();
  }
}
