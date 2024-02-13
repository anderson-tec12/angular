import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  //ReactiveFormModule
  constructor(
    private formBuilder:FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router
  ){}

  loginCard = true


  handler = {
    toggleForm: (value:boolean) => {
      this.loginCard = value
    }
  }

  loginForm = this.formBuilder.group({
    mail: ['', Validators.required],
    pass:['', Validators.required]
  })

  createUserForm = this.formBuilder.group({
    name:['', Validators.required],
    mail: ['', [Validators.required, Validators.email]],
    pass:['', Validators.required]
  })

  onSubmitLoginForm(event:SubmitEvent):void{
    console.log(event)
    console.log(this.loginForm.value)

    if(this.loginForm.value && this.loginForm.valid ){
      this.userService.authUser({
        email:  this.loginForm.value.mail!,
        password: this.loginForm.value.pass!,
      }).subscribe({
        next:(response) => {
          console.log({response})
          this.cookieService.set('USER_INFO', response.token)

          this.loginForm.reset()

          this.messageService.add({
            severity:'success',
            summary:'Sucesso',
            detail:`Bem vindo ${response.email}`,
            life: 2000
          })

          this.router.navigate(['dashboard'])
        },
        error:(err)=> {
          console.log({err})

          this.messageService.add({
            severity:'error',
            summary:'Erro',
            detail:`Verifique o email e senha`,
            life: 2000
          })
        }
      })
    }

  }

  onSubmitCreateUserForm(event:SubmitEvent):void{
    console.log(event)
    console.log(this.createUserForm.value)

    if(this.createUserForm.value && this.createUserForm.valid){
      this.userService.signupUser({
        email:this.createUserForm.value.mail!,
        name: this.createUserForm.value.name!,
        password: this.createUserForm.value.pass!
      }).subscribe({
        next:(data) => {
          console.log({data})

          // this.createUserForm.reset()

          this.loginForm.setValue({
            mail:this.createUserForm.value.mail!,
            pass:''
          })

          this.handler.toggleForm(true)
          this.createUserForm.reset()

          this.messageService.add({
            severity:'success',
            summary:'Sucesso',
            detail:`Usuario criado com sucesso`,
            life: 2000
          })
        },
        error: (err) => {
          console.log({err})

          this.messageService.add({
            severity:'error',
            summary:'Error',
            detail:`Erro ao criar o usuario`,
            life: 2000
          })
        }
      })
    }
  }


}
