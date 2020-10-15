module.exports = function advanceQuery(query, userQuery) {
  console.log(userQuery);
  const { select, sort, populate } = userQuery;
  query.select(select);
  query.sort(sort);
  query.populate(populate);
  return query;
};
