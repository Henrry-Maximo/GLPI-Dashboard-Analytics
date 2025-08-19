function getDateFromSevenDaysAgo(date: number) {
  const sevenDaysAgo = new Date();

  sevenDaysAgo.setDate(date - 7);
  return sevenDaysAgo.toISOString().slice(0, 10).replace("T", " ");
}
