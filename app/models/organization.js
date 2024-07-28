import Model, { attr, hasMany } from '@ember-data/model';

export default class OrganizationModel extends Model {
  @attr name;
  @hasMany('repository', { async: true, inverse: 'organization' }) repositories;
}
