import RESTSerializer from '@ember-data/serializer/rest';

export default class OrganizationSerializer extends RESTSerializer {
  normalizeFindRecordResponse(store, primaryModelClass, payload, id) {
    let organization = {
      id: id,
      type: 'organization',
      attributes: {
        name: id,
      },
      relationships: {
        repositories: {
          data: payload.map(repo => ({
            id: repo.id,
            type: 'repository'
          }))
        }
      }
    };

    let included = payload.map(repo => ({
      id: repo.id,
      type: 'repository',
      attributes: {
        name: repo.name,
        owner: repo.owner.login,
        htmlUrl: repo.html_url,
        language: repo.language,
        isPrivate: repo.private,
        branchCount: repo.branches_url ? repo.branches_url.split('/').length : 0
      }
    }));

    return {
      data: organization,
      included: included
    };
  }
}