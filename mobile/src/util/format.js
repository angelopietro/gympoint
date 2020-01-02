import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

/* ----- DATE FORMAT PT-BR ----- */
export const customFormatDate = value => {
  if (!value) return null;
  const dateFormatted = formatRelative(parseISO(value), new Date(), {
    locale: pt,
    addSuffix: true,
  });

  return dateFormatted;
};
