import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
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
  }

  //ReactiveFormModule
  constructor(private formBuilder:FormBuilder){}
}
