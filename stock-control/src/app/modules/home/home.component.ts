import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
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
    private cookieService: CookieService
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
        },
        error:(err)=> {
          console.log({err})
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
        },
        error: (err) => {
          console.log({err})
        }
      })
    }
  }


}
