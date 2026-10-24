export const encodeCode = (code: string): string => {
  if (typeof window === 'undefined') return '';
  return btoa(code);
};

export const decodeCode = (encoded: string): string => {
  if (typeof window === 'undefined') return '';
  try {
    return atob(encoded);
  } catch (e) {
    console.error('Failed to decode code', e);
    return '';
  }
};
