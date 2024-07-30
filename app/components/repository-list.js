import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class RepositoryListComponent extends Component {
  @service store;
  @service github;
  @tracked organizationName;
  @tracked token;
  @tracked organization;
  @tracked repositories = [];
  @tracked filteredRepositories = [];
  @tracked uniqueLanguages = [];

  async fetchRepositories() {
    const repositories = await this.organization.get('repositories');
    const languages = new Set();

    repositories.forEach((repo) => {
      const language = repo.language;
      if (language) {
        languages.add(language);
      }
    });

    this.uniqueLanguages = Array.from(languages);
    this.repositories = repositories;
    this.filteredRepositories = repositories; // Initial display
  }

  @action
  updateOrganization(event) {
    this.organizationName = event.target.value;
  }

  @action
  updateToken(event) {
    this.token = event.target.value;
    this.github.setToken(event.target.value);
  }

  @action
  async fetchOrganization(event) {
    event.preventDefault();
    try {
      const organization = await this.store.findRecord(
        'organization',
        this.organizationName,
      );
      this.organization = organization;
      await this.fetchRepositories();
    } catch (error) {
      console.error('Error fetching organization:', error);
    }
  }

  @action
  filterRepos(filters) {
    this.filteredRepositories = this.repositories.filter(repo => {
      const matchesPublic = filters.public && !repo.isPrivate;
      const matchesPrivate = filters.private && repo.isPrivate;
      const matchesLanguage = filters.languages.length === 0 || filters.languages.includes(repo.language);

      return (matchesPublic || matchesPrivate) && matchesLanguage;
    });
  }
}
