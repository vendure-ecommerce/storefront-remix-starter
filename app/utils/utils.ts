const numberFormatter = new Intl.NumberFormat('hu-HU');

function formatNumberWithSeparator(number: number): string {
  return numberFormatter.format(number);
}

export { formatNumberWithSeparator };
