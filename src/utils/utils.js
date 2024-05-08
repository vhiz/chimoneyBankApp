export const count = (dates, userInfo) => {
  const userCountsByMonth = {};

  dates.forEach((TransactionDate) => {
    const date = new Date(TransactionDate.paymentDate);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;

    const monthYearKey = `${year}-${month.toString().padStart(2, "0")}`;

    if (userCountsByMonth[monthYearKey]) {
      userCountsByMonth[monthYearKey]++;
    } else {
      userCountsByMonth[monthYearKey] = 1;
    }
  });

  const calculateIncomeAndOutcome = (transactions) => {
    let income = 0;
    let outcome = 0;

    transactions.forEach((transaction) => {
      if (transaction.receiver === userInfo.id) {
        income += parseInt(transaction.valueInUSD);
      } else {
        outcome += parseInt(transaction.valueInUSD);
      }
    });

    return { income, outcome };
  };

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const userCountsArray = monthNames.map((monthName, index) => {
    const transactionsForMonth = dates.filter(
      (date) => new Date(date.paymentDate).getUTCMonth() === index
    );

    const { income, outcome } = calculateIncomeAndOutcome(transactionsForMonth);

    return {
      name: monthName,
      amount: income - outcome,
    };
  });

  return userCountsArray;
};

export function addCommas(number) {
  let formattedNumber = number.toFixed(2).toString();

  if (formattedNumber.length <= 6) {
    return formattedNumber;
  }

  return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
