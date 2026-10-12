export const formatShortDate = (isoDate: string): string => {
  const [, month, day] = isoDate.split('-');
  return `${day}/${month}`;
};