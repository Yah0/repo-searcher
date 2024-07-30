import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FiltersComponent extends Component {
  @tracked selectedFilters = {
    public: true,
    private: true,
    languages: []
  };

  constructor() {
    super(...arguments);
    this.selectedFilters.languages = [...this.args.languages];
  }

  @action
  toggleFilterType(event) {
    const { id, checked } = event.target;

    if (id === 'public') {
      if (!checked && !this.selectedFilters.private) {
        this.selectedFilters.private = true;
      }
      this.selectedFilters.public = checked;
    } else if (id === 'private') {
      if (!checked && !this.selectedFilters.public) {
        this.selectedFilters.public = true;
      }
      this.selectedFilters.private = checked;
    }
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
