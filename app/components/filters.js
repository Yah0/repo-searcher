import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FiltersComponent extends Component {
  @tracked selectedFilters = {
    public: true,
    private: true,
    languages: []
  };

  @action
  toggleFilterType(event) {
    const { id, checked } = event.target;
    this.selectedFilters[id] = checked;
  }

  @action
  toggleLanguageFilter(event) {
    const language = event.target.value;
    if (event.target.checked) {
      this.selectedFilters.languages.push(language);
    } else {
      this.selectedFilters.languages = this.selectedFilters.languages.filter(lang => lang !== language);
    }
  }

  @action
  applyFilters(event) {
    event.preventDefault();
    this.args.filterRepos(this.selectedFilters);
  }
}
