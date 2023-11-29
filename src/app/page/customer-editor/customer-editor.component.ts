import { Component, Input, OnInit, effect, inject, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomerStore } from '../../store/CustomerStore';
import { Customer } from '../../model/customer';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
  ],
  templateUrl: './customer-editor.component.html',
  styleUrl: './customer-editor.component.scss',
  providers: [
    CustomerStore,
    MatSnackBar,
  ],
})
export class CustomerEditorComponent implements OnInit {

  @Input({transform: numberAttribute}) id: number = 0;

  store = inject(CustomerStore);

  snackBar = inject(MatSnackBar);

  router = inject(Router);

  customer = this.store.selected;

  selectError = this.store.error;

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9 ]{3,}$'),
    ]),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    address: new FormControl('', {
      validators: [Validators.required],
    }),
    ip_address: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)
      ],
    }),
    active: new FormControl(false),
    id: new FormControl(0),
  });

  constructor() {
    effect(() => {
      if (this.customer()) {
        this.form.patchValue(this.customer() as Customer);
      }

      if (this.selectError()) {
        this.snackBar.open(this.selectError(), 'Close', {
          duration: 3000,
        });
      }
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this.store.selectItem(this.id);
    }
  }

  onUpdate(form: FormGroup) {
    this.store.updateItem(form.value);
    this.router.navigate(['/customers']);
  }
}
