const getValueForSortingByString = (sortBy) => {
  let sortValue;
  switch (sortBy) {
    case "None":
      sortValue = {};
      break;
    case "Price Ascending":
      sortValue = { price: 1 };
      break;
    case "Price Descending":
      sortValue = { price: -1 };
      break;
    case "Most Rating":
      sortValue = { rating: -1 };
      break;
    case "Most Reviews":
      sortValue = { numReviews: -1 };
      break;
    default:
      sortValue = {};
      break;
  }

  return sortValue;
};

export { getValueForSortingByString };
