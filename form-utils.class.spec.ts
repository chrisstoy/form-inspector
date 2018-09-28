import { FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { FormUtils } from './form-utils.class';

describe('FormUtils', () => {
  const mockControl = 'mock Control';
  const mockWarning = 'mock Warning';

  describe('hasWarning', () => {
    it('should return false if group is undefined', () => {
      expect(FormUtils.hasWarning(undefined, mockControl, mockWarning)).toBeFalsy();
      expect(FormUtils.hasWarning(null, mockControl, mockWarning)).toBeFalsy();
    });

    it('should return false if control is undefined', () => {
      const group = new FormGroup({});
      expect(FormUtils.hasWarning(group, mockControl, mockWarning)).toBeFalsy();
    });

    it('should return false if the group is disabled (regardless if the warning exists)', () => {
      const mockFormControl = new FormControl('');

      const group = new FormGroup({
        [mockControl]: mockFormControl,
      });

      FormUtils.setWarning(mockFormControl, mockWarning, true);
      expect(FormUtils.hasWarning(group, mockControl, mockWarning)).toBeTruthy();

      group.disable();
      expect(FormUtils.hasWarning(group, mockControl, mockWarning)).toBeFalsy();
    });

    it('should return false if no warning set on control', () => {
      const mockFormControl = new FormControl('');
      const group = new FormGroup({
        [mockControl]: mockFormControl,
      });

      FormUtils.setWarning(mockFormControl, mockWarning, true);
      expect(FormUtils.hasWarning(group, mockControl, mockWarning)).toBeTruthy();

      FormUtils.setWarning(mockFormControl, mockWarning, undefined);
      expect(FormUtils.hasWarning(group, mockControl, mockWarning)).toBeFalsy();
    });
  });

  describe('getWarning', () => {
    it('should return undefined if warning not set', () => {
      const mockFormControl = new FormControl('');
      const group = new FormGroup({
        [mockControl]: mockFormControl,
      });

      const result = FormUtils.getWarning(group, mockControl, mockWarning);
      expect(result).toBeUndefined();
    });

    it('should return the warning on the control', () => {
      const mockFormControl = new FormControl('');
      const group = new FormGroup({
        [mockControl]: mockFormControl,
      });

      FormUtils.setWarning(mockFormControl, mockWarning, 'mock warning message');
      const result = FormUtils.getWarning(group, mockControl, mockWarning);
      expect(result).toEqual('mock warning message');
    });
  });

  describe('clearWarnings', () => {
    it('should do nothing if no control passed', () => {
      expect(() => {
        FormUtils.clearWarnings(null);
      }).not.toThrow();
    });

    it('should do nothing if control has no warnings', () => {
      const control = new FormControl();
      expect(() => {
        FormUtils.clearWarnings(control);
      }).not.toThrow();

      expect(() => {
        FormUtils.clearWarnings(control, ['mockWarning1']);
      }).not.toThrow();
    });

    it('should clear all warnings on control', () => {
      const control = new FormControl();
      FormUtils.setWarning(control, 'mockWarning1', true);
      FormUtils.setWarning(control, 'mockWarning2', true);
      FormUtils.setWarning(control, 'mockWarning3', true);

      expect(control['warnings']).toEqual({
        mockWarning1: true,
        mockWarning2: true,
        mockWarning3: true,
      });
      FormUtils.clearWarnings(control);
      expect(control['warnings']).toBeUndefined();
    });

    it('should clear specified warnings on control', () => {
      const control = new FormControl();
      FormUtils.setWarning(control, 'mockWarning1', true);
      FormUtils.setWarning(control, 'mockWarning2', true);
      FormUtils.setWarning(control, 'mockWarning3', true);

      expect(control['warnings']).toEqual({
        mockWarning1: true,
        mockWarning2: true,
        mockWarning3: true,
      });
      FormUtils.clearWarnings(control, ['mockWarning1', 'mockWarning3']);
      expect(control['warnings']).toEqual({
        mockWarning2: true,
      });
    });
  });
});
