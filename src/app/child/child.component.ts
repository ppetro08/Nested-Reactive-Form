import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class ChildComponent {
  childControl = new FormControl(null, this.validatorFn());
  
  form: FormGroup;

  parentFormGroup: FormGroup;

  constructor(private parent: FormGroupDirective) {}

  ngOnInit(): void {
    this.parentFormGroup = this.parent.form;
    this.form = new FormGroup({
      childControl: this.childControl,
    });
    this.parentFormGroup.addControl('child', this.form);
  }

  validatorFn(): ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.valid ? { oof: 'oof' } : null;
    };
  }
}
