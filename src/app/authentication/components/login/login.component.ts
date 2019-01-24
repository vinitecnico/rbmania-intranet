import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as moment from 'moment';

// services
import { AuthenticationService } from '../../services/authentication.service';

declare var swal: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  private unsubscribe = new Subject<void>();
  form: FormGroup;
  passwordType: String = 'password';
  showPasswordError = false;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    @Inject('LocalStorage') localStorage,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login() {
    if (!this.form.valid) {
      return;
    }

    const request = this.form.value;
    request.username = btoa(request.username);
    request.password = btoa(request.password);

    this.authenticationService.login(request)
      .subscribe(response => {
        if (!response || response.length <= 0) {
          swal({
            text: 'Usuário ou senha inválido!',
            type: 'error'
          });
          return;
        }

        localStorage.setItem('authData', JSON.stringify({ expires_in: moment().add(30, 'minutes') }));
        this.router.navigateByUrl('/app/product');
      });
  }

  getHostErrorMessage(): string {
    return '';
  }
}
