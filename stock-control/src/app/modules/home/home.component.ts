import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthUserRequest } from 'src/app/model/interfaces/user/AuthUserRequest';
import { SignUpUserRequest } from 'src/app/model/interfaces/user/SignUpUserRequest';
import { UserService } from 'src/services/user/user.service';
import { Router } from '@angular/router';

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
    private cookiesService: CookieService,
    private messageService:MessageService,
    private router:Router
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

            this.messageService.add({
              severity:'success',
              summary:'Sucesso',
              detail:`Seja bem vindo ${res.name}`,
              life:2000
            })

            this.router.navigate(['/dashboard'])
          }
        },
        error: (err) => {
          console.log(err)
          this.messageService.add({
            severity:'error',
            summary:'Erro',
            detail:`Erro ao fazer login`,
            life:2000
          })
        }
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
            // alert('')
            this.signupForm.reset()
            this.loginCard = true

            this.messageService.add({
              severity:'success',
              summary:'Sucesso',
              detail:`Usuario criado com sucesso`,
              life:2000
            })
          }
        },
        error:(err) => {
          this.messageService.add({
            severity:'error',
            summary:'Erro',
            detail:`Erro ao criar usuario`,
            life:2000
          })
          console.log(err)
        }
      })
    }
  }
}
