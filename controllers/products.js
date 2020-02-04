let client = require('../elasticclient');

module.exports = {
  getProducts: function(req, res, next) {
    let searchKeyword = req.query.q || null;
    let limit = req.query.limit || 20;
    let offset = req.query.offset || 0;

    let searchQuery = {
      index: 'ecommerce',
      size: limit,
      from: offset,
      sort: ['id:asc'],
      body: {}
    };

    if (searchKeyword) {
      searchQuery['body'] = {
        query: {
          multi_match: {
            query: searchKeyword,
            fields: ['name','description'],
            operator: 'or'
          }
        }
      }
    }

    client.search(searchQuery, (err, resp) => {
      if (err) {
        return next(null, err);
      }
      let total = resp.hits.total;
      let hits = resp.hits.hits;
      let items = [];
      hits.forEach(hit => {
        items.push(hit._source);
      });
      let responseObject = {};
      responseObject['items'] = items;
      responseObject['search_params'] = [];
      if (searchKeyword) {
        responseObject['search_params'].push({q: searchKeyword});
      }
      responseObject['limit'] = limit;
      responseObject['offset'] = offset;
      responseObject['total'] = total;
      return next(responseObject, null);
    });
  }
}
