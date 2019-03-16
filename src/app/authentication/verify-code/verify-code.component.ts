import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerifyCode } from '../Model/VerifyCode';
import { authenticationService } from '../authentication-Service';
 

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css'],
  
})
export class VerifyCodeComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
 
  }
   VerifyCode:VerifyCode;
  constructor(
    private activatedRoute: ActivatedRoute,
    private auth:authenticationService,
 
    private router: Router) {
       this.VerifyCode=new  VerifyCode();
  
   }

  ngOnInit() {
   
   this.VerifyCode.phoneNumber= this.activatedRoute.snapshot.params["phonenumber"];
  }
  Login(verifycodeinput:string){
    this.VerifyCode.verifyCode=verifycodeinput;

    this.auth.checkVerifyCode(this.VerifyCode).subscribe(res=>{
      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('refresh_token', res.refresh_token);
      this.auth.getProfileOnApi().subscribe(res=>{
        this.router.navigate(["/Home"]);
      })
   

    })
  }
}
