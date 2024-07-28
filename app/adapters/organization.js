import ApplicationAdapter from './application';

export default class OrganizationAdapter extends ApplicationAdapter {
  urlForFindRecord(id) {
    return `https://api.github.com/orgs/${id}/repos`;
  }

  get headers() {
    return {
      'Authorization': `token ${this.github.token}`,
      'Accept': 'application/json'
    };
  }
}
