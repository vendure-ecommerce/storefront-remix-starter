const numberFormatter = new Intl.NumberFormat('hu-HU');

function formatNumberWithSeparator(number: number): string {
  return numberFormatter.format(number);
}

function generateUniqueId(prefix: string = ''): string {
  return `${prefix}-${Math.random().toString(36).substring(7)}`;
}

export { formatNumberWithSeparator, generateUniqueId };
