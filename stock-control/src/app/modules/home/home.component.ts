import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  //ReactiveFormModule
  constructor(private formBuilder:FormBuilder, private userService: UserService){}

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
        },
        error: (err) => {
          console.log({err})
        }
      })
    }
  }


}
