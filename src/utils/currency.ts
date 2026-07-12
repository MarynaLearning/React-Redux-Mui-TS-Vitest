/**
 * @Description Formats a number as a USD-style price string, e.g. 89.99 -> "$89.99"
 * @param amount
 * */
export const formatCurrency = (amount: number): string =>
  `$${amount.toFixed(2)}`
