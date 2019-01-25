/**
 * @description - Paginates the articles collections
 *
 * @param {object} articles - articles details
 *
 * @param {Number} currentPage - Current page
 *
 * @param {Number} limit - Page limit
 *
 * @returns {object} pagination - Pagination object
 */

const pagination = (currentCount, limit, currentPage, totalCount) => {
  // const articlesCount = totalcount;
  const pages = Math.ceil(totalCount / limit);
  const nextPage = currentPage < pages ? currentPage + 1 : null;
  const prevPage = currentPage > 1 ? currentPage - 1 : null;

  return Object.assign(
    {},
    {
      currentPage,
      currentCount,
      totalCount,
      pages,
      nextPage,
      prevPage
    }
  );
};

export default pagination;
