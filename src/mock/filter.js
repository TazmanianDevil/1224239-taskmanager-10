const FILTER_NAMES = [
  `all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`
];

export const generateFilters = () => {
  return FILTER_NAMES.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 10),
    };
  });
};
