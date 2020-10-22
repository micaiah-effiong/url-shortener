module.exports = async function pagination(query, userQuery) {
  // manipulate queries
  const total = (await query.exec()).length;
  let page, limit;
  if (userQuery.page) {
    page = parseInt(userQuery.page || 1);
    page = page < 1 ? 1 : page;
  }

  if (userQuery.limit) {
    limit = parseInt(userQuery.limit || 20);
    limit = limit < 1 ? 20 : limit;
  }

  const offest = limit * (page - 1) || 0;
  query.limit(limit).skip(offest);

  const paginate = { total };
  if (page > 1) {
    paginate.prev = page - 1;
  }

  if (offest * page < total) {
    paginate.next = page + 1;
  }

  return paginate;
};
