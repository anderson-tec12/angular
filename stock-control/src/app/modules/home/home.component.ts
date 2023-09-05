import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthUserRequest } from 'src/app/model/interfaces/user/AuthUserRequest';
import { SignUpUserRequest } from 'src/app/model/interfaces/user/SignUpUserRequest';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard = true
  loginForm = this.formBuilder.group({
    email:['', Validators.required],
    password:['', Validators.required]
  })

  signupForm = this.formBuilder.group({
    name:['', Validators.required],
    email:['', Validators.required],
    password:['', Validators.required],
  })

  constructor(
    private formBuilder:FormBuilder,
    private userService: UserService,
    private cookiesService: CookieService
  ){}


  onSubmitLoginForm(){
    console.log('Dados do formulario de login', this.loginForm.value)
    if(this.loginForm.value && this.loginForm.valid){
      this.userService
      .authUser(this.loginForm.value as AuthUserRequest)
      .subscribe({
        next:(res) => {
          if(res){
            this.cookiesService.set('USER_INFO', res.token)

            this.loginForm.reset()
          }
        },
        error: (err) => console.log(err)
      })

    }
  }

  onSubmitSignupForm(){
    console.log('Dados do formulario de signup', this.signupForm.value)

    if(this.signupForm.value && this.signupForm.valid){
      this.userService
      .signUpUser(this.signupForm.value as SignUpUserRequest)
      .subscribe({
        next:(res) => {
          if(res){
            alert('Usuario criado com sucesso')
            this.signupForm.reset()
            this.loginCard = true
          }
        },
        error:(err) => console.log(err)
      })
    }
  }
}
