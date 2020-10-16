module.exports = function pagination(query, userQuery) {
  // manipulate queries
  let page, limit;
  if (userQuery.page) {
    page = userQuery.page;
  }

  if (userQuery.limit) {
    limit = userQuery.limit;
  }

  limit = parseInt(limit || 20);
  page = parseInt(page || 1);
  const offest = limit * (page - 1) || 0;
  query.limit(limit).skip(offest);
  return query;
};
