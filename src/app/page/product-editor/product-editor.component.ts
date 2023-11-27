import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexLayoutModule,
    ],
  templateUrl: './product-editor.component.html',
  styleUrl: './product-editor.component.scss',
})
export class ProductEditorComponent {

  private fb = inject(FormBuilder);

  form!: FormGroup;

  constructor() {}
  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]{3,}$')]],
      price: [null, [Validators.required, Validators.min(1), Validators.max(1000)]],
      description: [null, [Validators.required]],
      active: [false],
    });
  }
  saveDetails(form: FormGroup) {
    alert('Form Validated)' + JSON.stringify(form.value, null, 4));
  }

}
