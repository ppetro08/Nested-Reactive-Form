import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ChildFormComponent } from '../form-group.directive';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentComponent extends ChildFormComponent {
  form: FormGroup;

  addControls(): void {
    this.form = new FormGroup({
      parentControl: new FormControl(null),
    });
    this.parentForm.addControl('parent', this.form);
  }
}
