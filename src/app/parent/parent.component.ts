import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class ParentComponent {
  parentFormGroup: FormGroup;

  form: FormGroup;

  parentControl = new FormControl(undefined, this.validatorFn());

  constructor(private parent: FormGroupDirective) {}

  ngOnInit(): void {
    this.parentFormGroup = this.parent.form;
    this.form = new FormGroup({
      parentControl: this.parentControl,
    });
    this.parentFormGroup.addControl('parent', this.form);
  }

  validatorFn(): ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.valid ? { oof: 'oof' } : null;
    };
  }
}
