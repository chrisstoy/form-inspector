import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export enum AddressFormControls {
  Name = 'name',
  FirstName = 'givenName',
  LastName = 'surName',
  Email = 'email',
  Address = 'address',
  Street1 = 'street1',
  Street2 = 'street2',
  City = 'city',
  State = 'state',
  Zip = 'zip'
}

@Component({
  selector: 'app-second-form',
  templateUrl: './second-form.component.html',
  styleUrls: ['./second-form.component.css']
})
export class SecondFormComponent {

  public readonly AddressFormControls = AddressFormControls;
  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.formGroup = this.formBuilder.group({
      [AddressFormControls.Email]: ['', [Validators.email, Validators.required]],

      [AddressFormControls.Name]: this.formBuilder.group({
        [AddressFormControls.FirstName]: ['', Validators.required],
        [AddressFormControls.LastName]: ['', Validators.required],
      }),

      [AddressFormControls.Address]: this.formBuilder.group({
        [AddressFormControls.Street1]: ['', Validators.required],
        [AddressFormControls.Street2]: [''],
        [AddressFormControls.City]: ['', Validators.required],
        [AddressFormControls.State]: ['', Validators.required],
        [AddressFormControls.Zip]: ['', [Validators.required]],
      }),
  });
  }
}
