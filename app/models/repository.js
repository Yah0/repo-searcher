import Model, { attr, belongsTo } from '@ember-data/model';

export default class RepositoryModel extends Model {
  @attr name;
  @attr owner;
  @attr htmlUrl;
  @attr language;
  @attr isPrivate;
  @belongsTo('organization', { async: true, inverse: 'repositories' })
  organization;

  get fullName() {
    return `${this.owner}/${this.name}`;
  }
}
