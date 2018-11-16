(function(chrome) {

  function getControlState(control, controlName = null, recursive = false) {
    const result = {
      name: controlName,
      status: control.status,
      valid: control.valid,
      pending: control.pending,
      enabled: control.enabled,
      errors: control.errors,
      warnings: control['warnings'],
      dirty: control.dirty,
      touched: control.touched,
      hasError: control.hasError,
    };

    result.value = control.value;

    if (recursive) {
      const controls = control.controls;
      if ( controls ) {
        result.children =  controls.map( (c, name) => this.getControlState(c, name, recursive));
      }
    }
    return result;
  }

  function getSelectedFormData() {
    let formData = {};
  
    const debugElement = ng.probe($0);
    if (debugElement) {
      const component = debugElement.componentInstance;
      if (component && component.form) {
        formData = getControlState(component.form, component.controlName, true );
      }
    }
    return formData;
  }

})(chrome);