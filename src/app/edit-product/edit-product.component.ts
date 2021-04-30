import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  public editForm: FormGroup;
  userRef: any;
  constructor(
    public userService: UserService,
    public formBuilder: FormBuilder,
    private act: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      name: [''],
      email: [''],
      contact: [''],
    });
  }

  ngOnInit(): void {
    const id = this.act.snapshot.paramMap.get('id');

    this.userService.getProductDoc(id).subscribe((res) => {
      this.userRef = res;
      this.editForm = this.formBuilder.group({
        name: [''],
        email: [''],
        contact: [''],
      });
      console.log(id);
    });
  }

  onSubmit() {
    const id = this.act.snapshot.paramMap.get('id');
    this.router.navigate(['list-products']);
  }
}
