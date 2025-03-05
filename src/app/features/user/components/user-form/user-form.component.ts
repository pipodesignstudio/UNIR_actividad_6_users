import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { IUser } from '../../../../shared/interfaces';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { UsersApiService } from '../../../../shared/services/users-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface IFormValue {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  image: string;
}

@Component({
  selector: 'app-user-form',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './user-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit{ 
  @Input() user:IUser | null = null;

  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UsersApiService);
  public isUploading:boolean = false;

  public userForm = this.fb.group({
    first_name: ['', [Validators.required, Validators.minLength(3)]],
    last_name: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    image: ['', [Validators.required]]
  });

  hasChanges:boolean | null = null;

  ngOnInit(): void {
    if (this.user) {
      const { first_name, last_name, email, image, username } = this.user;
      const initialValue = { first_name, last_name, email, image, username };
  
      this.userForm.patchValue(initialValue);
      this.hasChanges = false;
  
      this.userForm.valueChanges.subscribe( _ => {
        this.hasChanges = true;
      });
    }
  }
  
  isValidPicture() {
    const imageValue = this.userForm.get('image')?.value;
    if (!imageValue) return false;

    // Más info de este CIF abajo
    if (imageValue.includes('i.pravatar.cc')) return true;

    try {
      const url = new URL(imageValue);
      /*
      ⚠️ CUIDADO: Esta idea no me gusta mucho para la vida real
      La es tratar de estresar el objetor URL con los formatos comunes de imágenes para ver si podría encajar dentro del binding [src]
      Esto va a crear un resultado efectista en el front cuando el usuario pegue una url válida, pero si viene de cdn podría no cogerlo bien.
      Me di cuenta de ello cuando vi que no renderizaba el pravatar del api
      */
      return /\.(jpeg|jpg|gif|png|webp)$/i.test(url.pathname); 
    } catch {
      return false;
    }
    
  }

  getButtonLabel() {
    return this.user? 'Actualizar' : 'Crear usuario';
  }

  async onSubmit() {
    // El submit está deshabilitado si no es válido por lo que no necesito validar aquí
    this.isUploading = true;
    const bodyRequest = this.userForm.value as IFormValue;
    if (this.user) {
      const resp = await this.userService.updateUser(this.user._id, bodyRequest);
      if ('error' in resp) { 
        this.isUploading = false;
        this.snackBar.open('❌ Error al actualizar el usuario', 'Cerrar', { duration: 2000 });
      } else {
        this.router.navigate(['/']);
        this.snackBar.open('✅ Usuario actualizado con éxito', 'Cerrar', { duration: 2000 });
      }
    } else {
      const partialUser = {password: `UNIR_${Math.random()}`, ...bodyRequest}
      const resp = await this.userService.createUser(partialUser);
      if ('error' in resp) { 
        this.isUploading = false;
        this.snackBar.open('❌ Error al crear el usuario', 'Cerrar', { duration: 2000 });
      } else {
        this.router.navigate(['/']);
        this.snackBar.open('✅ Usuario creado con éxito', 'Cerrar', { duration: 2000 });
      }
    }
  }

}
