const dateComparer = (d1, d2) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  const diff = date2.getTime() - date1.getTime();

  if (diff >= 0) {
    return "valid";
  } else {
    return "invalid";
  }

  //date1 = today;
  //date2 = deadline;
};

export default dateComparer;
