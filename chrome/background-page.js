function getControlState(control, controlName = null, recursive = false) {
  const result = {
    name: controlName,
    status: control.status,
    valid: control.valid,
    pending: control.pending,
    enabled: control.enabled,
    errors: control.errors,
    dirty: control.dirty,
    touched: control.touched,
    value: control.value,
  };

  if (recursive) {
    const controls = control.controls;
    if ( controls ) {
      result.children = {};
      for ( let entry of Object.entries(controls)) {
        result.children[entry[0]] = this.getControlState(entry[1], entry[0], recursive);
      }
    }
  }
  return result;
}

function getFormGroupFromComponent(component) {
  if ( component ) {
    for ( let entry of Object.entries(component)) {
      const value = entry[1];     
      if ( typeof value === 'object' ) {
        // probe a few properties to see if it is a Form Control
        if ( value.hasOwnProperty('status') && value.hasOwnProperty('_onCollectionChange')) {
          return entry;
        }
      }
    }
  }
  return null;
}

function getSelectedFormData() {
  let formData = { empty: 'No Form Selected' };

  const debugElement = ng.probe($0);
  if (debugElement) {
    const component = debugElement.componentInstance;
    const form = getFormGroupFromComponent(component);
    if (form) {
      formData = getControlState(form[1], form[0], true );
    }
  }
  return formData;
}

getSelectedFormData();  