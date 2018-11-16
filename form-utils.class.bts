import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import * as _ from 'lodash';

interface FormUtilsControlValues {
  [control: string]: any;
}

export interface FormUtilsControlState {
  name: string;
  status: string;
  valid: boolean;
  pending: boolean;
  enabled: boolean;
  dirty: boolean;
  touched: boolean;
  hasError: any;
  errors: ValidationErrors;
  warnings: any;
  value?: any;
  children?: FormUtilsControlState[];
}

/**
 * Set a series of FormControl values, maintaining a sentinal for
 * tracking while the setValues are happening.
 */
export class FormUtils {
  /**
   * Returns object representing the control's state
   */
  public static getControlState(
    control: AbstractControl,
    controlName: string = null,
    recursive = false
  ): FormUtilsControlState {
    const result: FormUtilsControlState = {
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
    if (control instanceof FormControl) {
      _.set(result, 'value', control.value);
    }

    if (recursive) {
      _.set(
        result,
        'children',
        _.map(_.get(control, 'controls', []), (c, name) => this.getControlState(c, name, recursive))
      );
    }
    return result;
  }

  /**
   * Sets the specified control in the group to enabled/disabled without emitting events
   */
  public static setEnabled(group: FormGroup, field: string, isEnabled: boolean = true) {
    const control = group.get(field);
    if (control) {
      if (isEnabled) {
        control.enable({ onlySelf: true, emitEvent: false });
      } else {
        control.disable({ onlySelf: true, emitEvent: false });
      }
    }
  }

  /**
   * Set the values for the named controls if it is different, without emitting statusChanges
   * and valueChanges events
   */
  public static setValues(form: AbstractControl, values: FormUtilsControlValues) {
    _.forOwn(values, (value, controlKey) => {
      const control = form.get(controlKey);
      FormUtils.setValue(control, value);
    });
  }

  /**
   * Set the value for the control if it is different, without emitting statusChanges
   * and valueChanges events
   */
  public static setValue(control: AbstractControl, value: any) {
    if (control && !_.isEqual(control.value, value)) {
      control.patchValue(value, { emitEvent: false }); // don't emit change events
      control.markAsDirty();
    }
    control.markAsTouched();
  }

  /**
   * Set warning for the control and warningtype passed in
   */
  public static setWarning(control: AbstractControl, warningType: string, warning: Object) {
    _.set(control, `warnings[${warningType}]`, warning);
  }

  /**
   * Remove warning for the control and warningtype passed in
   */
  public static unsetWarning(control: AbstractControl, warningType: string) {
    _.unset(control, `warnings[${warningType}]`);
  }

  /**
   * Mark the passed control as touched. If recursive, mark all of its children as touched
   */
  public static markAsTouched(control: AbstractControl, recursive: boolean = true) {
    control.markAsTouched();
    if (recursive) {
      _.forEach(_.get(control, 'controls', []), c => FormUtils.markAsTouched(c, recursive));
    }
  }

  /**
   * Return true if the passed control or named control in the passed group has warnings
   * @param group control or group to test
   * @param field name of control in group to test. If not provided, returns if group has warnings
   */
  public static hasWarnings(group: AbstractControl, field?: string): boolean {
    if (group && group.enabled) {
      const control = field ? group.get(field) : group;
      return !!control && control.enabled && !_.isEmpty(_.get(control, 'warnings'));
    }
    return false;
  }

  public static hasWarning(group: AbstractControl, field: string, warning: string): boolean {
    if (group && group.enabled) {
      const control = field ? group.get(field) : group;
      return control && control.enabled && !!_.get(control, `warnings[${warning}]`);
    }
    return false;
  }

  public static getWarning(group: FormGroup, field: string, warning: string): any {
    const control = field ? group.get(field) : group;
    return _.get(control, `warnings[${warning}]`);
  }

  public static clearWarnings(control: AbstractControl, warnings: string[] = null) {
    if (control && _.hasIn(control, 'warnings')) {
      if (warnings) {
        _.forEach(_.castArray(warnings), warning => {
          delete control['warnings'][warning];
        });
      } else {
        delete control['warnings'];
      }
    }
  }

  public static hasErrors(group: FormGroup, field: string): boolean {
    if (group && group.enabled) {
      const control = group.get(field);
      return control && control.enabled && control.invalid;
    }
    return false;
  }

  public static hasError(group: FormGroup, field: string, error: string): boolean {
    if (group && group.enabled) {
      const control = group.get(field);
      return control && control.enabled && control.hasError(error);
    }
    return false;
  }
}
