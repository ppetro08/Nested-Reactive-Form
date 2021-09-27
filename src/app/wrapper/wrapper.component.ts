import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapperComponent implements OnInit {
  form: FormGroup = new FormGroup({}, this.validatorFn());

  wrapperControl = new FormControl(undefined, this.validatorFn());

  ngOnInit(): void {
    this.form.addControl('wrapperControl', this.wrapperControl);
  }

  validatorFn(): ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.valid ? { oof: 'oof' } : null;
    };
  }

  submitted(): void {
    console.log('submitted');
  }
}
