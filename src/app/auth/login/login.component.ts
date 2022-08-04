import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroupName!: FormGroup;
  checkSubmit:boolean = false;
  hide = true;
  logindata :any = [];
  tokenHold:any;
  _id:any;

  constructor(private router:Router,private toastr: ToastrService, private _loginService:LoginService, private _fb:FormBuilder) {

    this.formGroupName = _fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }
  

  loginForm(){
    this.checkSubmit = true;
    if(this.formGroupName.invalid){
      this.toastr.error('Login Failed', 'Enter correct email or password', {
        timeOut:2000,
        progressBar:true,
        progressAnimation:'decreasing'
      });
      return
    }else{
      const data = this.formGroupName.value;
      this._loginService.loginUser(data).subscribe( res => {
        console.log('login page res', res);
        this.logindata = res;
        if(this.logindata?.getUser?.access_token || this.logindata?.message === "Login successfully!"){
          this.logindata.getUser.forEach((item:any) => {
            this.tokenHold = item?.access_token;
            this._id = item?.emp_id;
          });
          localStorage.setItem('auth', this.tokenHold);
          localStorage.setItem('id', this._id);
          this.router.navigateByUrl('pages/dashboard');
          this.toastr.success(this.logindata?.message, '',{
            timeOut:2000,
            progressBar:true,
            progressAnimation:'decreasing'
          });
        }else if(this.logindata?.status === 5000 || this.logindata?.message === "Invalid username!"){
            this.toastr.error(this.logindata?.message, '', {
              timeOut:2000,
              progressBar:true,
              progressAnimation:'decreasing'
            });
          }else if(this.logindata?.status === 5000 || this.logindata?.message === "Invalid password!"){
            this.toastr.error(this.logindata?.message, '', {
              timeOut:2000,
              progressBar:true,
              progressAnimation:'decreasing'
            });
          }
      })
    }
  }
}
