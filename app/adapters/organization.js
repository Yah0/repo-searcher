import ApplicationAdapter from './application';

export default class OrganizationAdapter extends ApplicationAdapter {
  urlForFindRecord(id) {
    return `${this.host}/orgs/${id}/repos`;
  }
}
