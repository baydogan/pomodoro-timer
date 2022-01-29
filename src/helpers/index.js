export const resetForm = (form) => Object.keys(form).forEach((key) => (form[key] = null));

export const setTime = (time, startMin) => {
  time = startMin * 60;
};

