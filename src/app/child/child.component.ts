import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChildFormComponent } from '../form-group.directive';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent extends ChildFormComponent {
  form: FormGroup;

  addControls(): void {
    this.form = new FormGroup({
      childControl: new FormControl(null),
    });
    this.parentForm.addControl('child', this.form);
  }
}
