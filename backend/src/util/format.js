export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const currencyToDatabase = value => {
  if (!value) return value;
  value = value.replace(/\./g, ',');
  value = value.replace(/(?:R\$)/, '');
  const index = value.lastIndexOf(',');
  const first = `${value.substr(0, index).replace(/,/g, '')}`;
  const decimal = `${value.substr(index).replace(',', '.')}`;
  const currency = Number(`${first}${decimal}`);

  return currency;
};
