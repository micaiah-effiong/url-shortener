module.exports = function advanceQuery(query, userQuery) {
  console.log(userQuery);
  const { select, sort, populate } = userQuery;
  const _userQuery = { ...userQuery };
  ["page", "limit", "select", "sort", "populate"].map(
    (e) => delete _userQuery[e]
  );

  const fomartedQuery = JSON.parse(
    JSON.stringify(_userQuery)
      .replace("gt", "$gt")
      .replace("lt", "$lt")
      .replace("in", "$in")
  );

  query.find(fomartedQuery);
  query.select(select);
  query.sort(sort);
  query.populate(populate);
  return query;
};
