import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { IUser } from '../../../../shared/interfaces';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './user-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit{ 
  @Input() user:IUser | null = null;

  private fb = inject(FormBuilder);

  public userForm = this.fb.group({
    first_name: ['', [Validators.required, Validators.minLength(3)]],
    last_name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    image: ['', [Validators.required]]
  });

  ngOnInit(): void {
    if (this.user) {
      const {first_name, last_name, email,  image} = this.user;
      this.userForm.patchValue({first_name, last_name, email, image});
    }
  }

  onSubmit() {

  }

}
