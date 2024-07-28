import Model, { attr, belongsTo } from '@ember-data/model';

export default class BranchModel extends Model {
  @attr name;
  @belongsTo('repository', { async: true, inverse: 'repository' }) branches;
}
