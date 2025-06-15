export const validateBookSlotForm = (formData) => {
  const newErrors = {};
  if (!formData.name.trim()) {
    newErrors.name = "Name is required";
  }
  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Please enter a valid email address";
  }
  return newErrors;
};
