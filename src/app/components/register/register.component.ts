import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

// input ----- form control   <input>
// inputs ---- formGroup ------<form></form>

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}
  
  msgError:string = '';
  isLoading:boolean = false;

  RegisterForm: FormGroup = new FormGroup({
   name:new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
   email:new FormControl(null , [Validators.required , Validators.email]),
   password:new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
   rePassword:new FormControl(null),
   phone:new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
   
  } , {validators:[this.confirmPassword]} as FormControlOptions );

  confirmPassword( groub:FormGroup ):void{
    const password = groub.get(`password`);//value
    const rePassword = groub.get(`rePassword`); //value

    if(rePassword?.value == '' ){
      rePassword?.setErrors({required:true})
    }
    else if(password?.value != rePassword?.value){
      rePassword?.setErrors( {mismatch:true} )
    }
  }

  handleForm(): void{
   
    
   if(this.RegisterForm.valid){
    this.isLoading =true;
    this._AuthService.setRegister(this.RegisterForm.value).subscribe({
      next:(response)=>{
        if(response.message == 'success'){
          this.isLoading =true;

          this._Router.navigate(['/login' ])
        } //login
    },
      error:(err: HttpErrorResponse)=>{
        this.isLoading =false;
        this.msgError = err.error.message
        // console.log(err.error.message);
        
        
      }
    })
   }
    
  }
   


}
