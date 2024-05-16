export const getCurrencySymbol = (currency) => {
  switch (currency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    case "NPR":
      return "रु";
    default:
      return "$";
  }
};
