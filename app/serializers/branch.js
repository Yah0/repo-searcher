import JSONSerializer from '@ember-data/serializer/json';

export default class BranchSerializer extends JSONSerializer {
  normalizeQueryResponse(store, primaryModelClass, payload,) {
    let branches = payload.map((branch) => {
      return {
        id: branch.name,
        type: 'branch',
        attributes: {
          name: branch.name,
        },
      };
    });

    return { data: branches };
  }
}
