const startYear = 1930;
const currentYear = new Date().getFullYear();
const endYear = currentYear + 5;

export const dateConstants = {
  months: [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ],
  years: Array.from({ length: endYear - startYear + 1 }, (_, i) => (startYear + i).toString())
};
