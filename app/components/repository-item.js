import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class RepositoryItemComponent extends Component {
  @service store;
  @service github;
  @tracked branches;
  @tracked showBranches = false;

  get branchUrl() {
    return `https://github.com/${this.args.repo.fullName}/branches`;
  }

  @action
  async toggleBranches() {
    if (!this.showBranches) {
      const fullName = `${this.args.repo.owner}/${this.args.repo.name}`;
      this.branches = await this.github.fetchBranches(fullName);
    }
    this.showBranches = !this.showBranches;
  }
}
