export const buildFilter = (query, filterableFields) => {
  const filter = {};
  filterableFields.forEach(field => {
    if (query[field]) {
      filter[field] = query[field];
    }
  });
  return filter;
};
