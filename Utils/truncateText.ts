export const truncateText = (maxLength: number, text: string): string => {
  if (text.length > maxLength) return text.substring(0, maxLength) + '...';
  else return text;
};
