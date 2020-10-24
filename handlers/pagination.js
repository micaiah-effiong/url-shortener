module.exports = async function pagination(query, userQuery) {
  // manipulate queries
  const total = (await query.exec()).length;
  let page, limit;

  // find current page
  if (userQuery.page) {
    page = parseInt(userQuery.page || 1);
    page = page < 1 ? 1 : page;
  }

  // get page limit
  if (userQuery.limit) {
    limit = parseInt(userQuery.limit || 20);
    limit = limit < 1 ? 20 : limit;
  }

  // calculate offest
  const offest = limit * (page - 1) || 0;

  // add limit and skip to query
  query.limit(limit).skip(offest);

  // create pagination object with total items
  const paginate = { total };

  // add previous page
  if (page > 1) {
    paginate.prev = page - 1;
  }

  // add next page
  if (offest * page < total) {
    paginate.next = page + 1;
  }

  // add total pages
  paginate.pages = Math.ceil(total / limit);

  return paginate;
};
