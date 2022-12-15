import { format, parseISO } from 'date-fns';

export default function formatDate(valueDate) {
  const date = parseISO(valueDate);
  const formatDate = format(date, 'dd/MM/yyyy');

  return formatDate;
}
