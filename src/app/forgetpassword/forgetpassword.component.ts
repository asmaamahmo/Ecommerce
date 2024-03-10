import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ForgotpassService } from '../shared/services/forgotpass.service';
import { NotExpr } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {

  constructor( private _Router:Router , private _ForgotpassService:ForgotpassService ){}
  step1:boolean = true;
  step2:boolean = false;
  step3:boolean = false;
  email:string = '';
  userMsg:string = '';


  forgotForm:FormGroup = new FormGroup({
    email:new FormControl('')
  })

  resetCpdeForm:FormGroup = new FormGroup({
    resetCode:new FormControl('')
  })

  resetPassword:FormGroup = new FormGroup({
    newPassword:new FormControl('')
  })

  forgotPassword():void{
    const userEmail = this.forgotForm.value;//(email:value)
    this.email = userEmail.email;
     this._ForgotpassService.forgotPasswor(userEmail).subscribe( {
      next:(response)=>{
        console.log(response);
        this.userMsg = response.message;
        this.step1 = false;
        this.step2 = true;
        
      },
      error:(err)=>{
        this.userMsg = err.error.message;
      }
     }
    
      )
  }
  resetCode():void{
    let resetCode = this.resetCpdeForm.value;
    this._ForgotpassService.resetCode(resetCode).subscribe( {
      next:(response)=>{
        console.log(response);
        this.userMsg = response.status;
        this.step2 = false;
        this.step3 = true;
        
      },
      error:(err)=>{
        this.userMsg = err.error.message;
      }
    } )
  }
  newPassword():void{
    let resetForm = this.resetPassword.value;
    resetForm.email = this.email;
    this._ForgotpassService.resetPassword(resetForm).subscribe( {
     next:(response) =>{
      console.log(response);
      if(response.token){
        localStorage.setItem('Token' , response.token);
        this._Router.navigate(['/home'])
      }
      
     },
     error:(err)=>{
      this.userMsg = err.error.message
     }
    } )
  }
}
