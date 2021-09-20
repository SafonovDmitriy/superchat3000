export const required = (text) => !text.trim().length;
export const minlength = (text, { min }) => text.trim().length < min;
export const maxlength = (text, { max }) => text.trim().length > max;
