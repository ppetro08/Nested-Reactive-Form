import {
  ChangeDetectorRef,
  Component,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  SkipSelf,
} from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective as AngularFormGroupDirective,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  template: '',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: AngularFormGroupDirective,
    },
  ],
})
export abstract class ChildFormComponent implements OnInit {
  parentForm: FormGroup;

  form: FormGroup;

  constructor(private parentFormGroupDirective: AngularFormGroupDirective) {}

  ngOnInit(): void {
    this.parentForm = this.parentFormGroupDirective.form;
    this.addControls();
  }

  /**
   * Adds controls to this component's form and adds this component's form the the parentForm
   *
   * @usageNotes
   *
   * ### Create a form with one control
   *
   * ```ts
   * this.form = new FormGroup({
   *    password: new FormControl(null)
   * });
   *
   * this.parentFormGroup.addControl('childGroup', this.form)
   *
   * ```
   */
  abstract addControls(): void;
}

@Directive({
  selector: '[formGroup]',
})
export class FormGroupDirective implements OnDestroy {
  private destroyed$ = new Subject<void>();

  constructor(
    @Self() formGroupDirective: AngularFormGroupDirective,
    @Optional() @SkipSelf() parentFormGroupDirective: AngularFormGroupDirective,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    if (parentFormGroupDirective) {
      parentFormGroupDirective.ngSubmit
        .pipe(takeUntil(this.destroyed$))
        .subscribe((event: any) => {
          formGroupDirective.onSubmit(event);
          this.changeDetectorRef.markForCheck();
        });
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
