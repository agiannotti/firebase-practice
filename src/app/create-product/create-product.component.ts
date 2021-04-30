import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  public productForm: FormGroup;
  constructor(
    public userService: UserService,
    public formBuilder: FormBuilder,
    public router: Router
  ) {
    this.productForm = this.formBuilder.group({
      name: [''],
      email: [''],
      contact: [''],
    });
  }

  onSubmit() {
    this.userService.createProduct(this.productForm.value);
    this.router.navigate(['list-products']);
  }
}
