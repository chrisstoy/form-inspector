x = () => {
  let formData = {};

  const debugElement = ng.probe($0);
  if (debugElement) {
    const component = debugElement.componentInstance;
    if (component && component.form) {
      formData = component.form.getRawValue();
    }
  }
  return formData;
};
x();
