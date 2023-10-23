const sortingByProperty = (what, p1, p2) => {
  const sorted = what.sort((a, b) => {
    if (p2) {
      return b[p1][p2] - a[p1][p2];
    }
    return b[p1] - a[p1];
  });

  return sorted;
};

export default sortingByProperty;
