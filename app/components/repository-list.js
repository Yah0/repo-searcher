import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class RepositoryListComponent extends Component {
  @service store;
  @service github;

  @tracked organizationName;
  @tracked token = localStorage.getItem('github-token') || '';
  @tracked organization;
  @tracked repositories = [];
  @tracked filteredRepositories = [];
  @tracked uniqueLanguages = [];
  @tracked showFilters = false;
  @tracked displayError = false;
  @tracked displayNoAccess = false;

  constructor() {
    super(...arguments);
    if (this.token) {
      this.github.setToken(this.token);
    }
  }

  async fetchRepositories() {
    const repositories = await this.organization.repositories;
    if (repositories.length === 0) {
      this.displayNoAccess = true;
    }
    const languages = [];

    repositories.forEach((repo) => {
      const language = repo.language;
      if (language && !languages.includes(language)) {
        languages.push(language);
      }
    });

    this.uniqueLanguages = languages;
    this.repositories = repositories;
    this.filteredRepositories = repositories;
    this.showFilters = true;
  }

  @action
  updateOrganization(event) {
    this.organizationName = event.target.value;
  }

  @action
  updateToken(event) {
    this.token = event.target.value;
    this.github.setToken(event.target.value);
    localStorage.setItem('github-token', event.target.value);
  }

  @action
  async fetchOrganization(event) {
    this.displayError = false;
    this.displayNoAccess = false;
    this.showFilters = false;
    event.preventDefault();
    try {
      const organization = await this.store.findRecord(
        'organization',
        this.organizationName
      );
      this.organization = organization;
      await this.fetchRepositories();
    } catch (error) {
      this.displayError = true;
      console.error('Error fetching organization:', error);
    }
  }

  @action
  filterRepos(filters) {
    this.filteredRepositories = this.repositories.filter((repo) => {
      const matchesPublic = filters.public && !repo.isPrivate;
      const matchesPrivate = filters.private && repo.isPrivate;
      const matchesLanguage =
        filters.languages.length === 0 ||
        filters.languages.includes(repo.language);

      return (matchesPublic || matchesPrivate) && matchesLanguage;
    });
  }
}
