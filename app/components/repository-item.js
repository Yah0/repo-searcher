import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class RepositoryItemComponent extends Component {
  @service store;
  @service github;
  @tracked branches;
  @tracked showBranches = false;
  @tracked numberOfBranches;

  constructor() {
    super(...arguments);
    this.fetchBranches();
  }

  async fetchBranches() {
    const fullName = `${this.args.repo.owner}/${this.args.repo.name}`;
    this.branches = await this.github.fetchBranches(fullName);
    this.numberOfBranches = this.branches.length;
  }

  @action
  toggleBranches() {
    this.showBranches = !this.showBranches;
  }
}
