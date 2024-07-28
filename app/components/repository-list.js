import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class RepositoryListComponent extends Component {
  @service store;
  @service github;
  @tracked organizationName;
  @tracked organization;

  @action
  updateOrganization(event) {
    this.organizationName = event.target.value;
  }

  @action
  updateToken(event) {
    this.github.setToken(event.target.value);
  }

  @action
  async fetchOrganization(event) {
    event.preventDefault();
    this.organization = await this.store.findRecord('organization', this.organizationName);
  }
}
