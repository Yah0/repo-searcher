import RESTSerializer from '@ember-data/serializer/rest';

export default class RepositorySerializer extends RESTSerializer {
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    payload = payload.map(repo => ({
      id: repo.id,
      type: 'repository',
      attributes: {
        name: repo.name,
        owner: repo.owner.login,
        htmlUrl: repo.html_url,
        language: repo.language,
        isPrivate: repo.private,
      }
    }));
    return this._super(store, primaryModelClass, { data: payload }, id, requestType);
  }
}
