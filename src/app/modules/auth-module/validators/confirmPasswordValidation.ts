import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function createConfirmPasswordValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const password: string = form.get("password")?.value;
    const confirmPassword: string = form.get("passwordConfirm")?.value;

    if (password !== confirmPassword) {
      form.get('passwordConfirm')?.setErrors({passwordConfirm: true});
      return null;
    }

    form.get('passwordConfirm')?.setErrors(null);
    return null;
  }
}
