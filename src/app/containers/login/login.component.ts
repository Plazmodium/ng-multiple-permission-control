import { Component, OnInit } from '@angular/core';
import { FeaturePermission } from 'src/app/shared/permission-control/models/feature-permissions.model';
import { IUserRequest } from 'src/app/user-feature/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as userActions from "../../user-feature/actions"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store) {

   }

  ngOnInit(): void {
  }


  submit() {
    const val = this.profileForm.value;
    const req: IUserRequest = {
      email: val.email,
      password: val.password
    }
    this.store.dispatch(userActions.loadUsers({ request: req }));

  }

}
