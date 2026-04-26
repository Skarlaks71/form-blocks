/**
 * Verifica se o tipo informado é um dos 22 tipos de input HTML5 válidos.
 * @param {string} type 
 * @returns {boolean}
 */
export const isValidInputType = (type) => {
  const htmlInputTypes = new Set([
    'button', 'checkbox', 'color', 'date', 'datetime-local', 
    'email', 'file', 'hidden', 'image', 'month', 'number', 
    'password', 'radio', 'range', 'reset', 'search', 
    'submit', 'tel', 'text', 'time', 'url', 'week'
  ]);

  return htmlInputTypes.has(type?.toLowerCase());
};