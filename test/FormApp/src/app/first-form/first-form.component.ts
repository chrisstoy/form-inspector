import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControls } from './form-controls.enum';

@Component({
  selector: 'app-first-form',
  templateUrl: './first-form.component.html',
  styleUrls: ['./first-form.component.css']
})
export class FirstFormComponent  {

  public readonly FormControls = FormControls;
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      [FormControls.First]: ['', [Validators.email, Validators.required]],
      [FormControls.Second]: this.formBuilder.group({
        [FormControls.Alfa]: [10, Validators.min(10)],
        [FormControls.Baker]: [10, Validators.max(10)],
        [FormControls.Charlie]: ['', Validators.required],
      }),
      [FormControls.Third]: ['red'],

    });
  }
}
