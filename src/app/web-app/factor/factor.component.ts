import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebAppService } from '../Services/webapp-service';
import { ProfileDto } from 'src/app/Core/DTO/Profile-dto';
import { PackService } from '../Services/Pack-Service';
import { AcceptSearchDto } from '../Services/accept-search-dto';

@Component({
  selector: 'app-factor',
  templateUrl: './factor.component.html',
  styleUrls: ['./factor.component.css']
})
export class FactorComponent implements OnInit {
  Factor:any;
  Profile:any;
  payment:number=-1;
   accept=new AcceptSearchDto();
  constructor(
     private activatedRoute: ActivatedRoute,
     private _webapp:WebAppService,
     private PacksService:PackService,
     private router:Router,
     ) { }

  ngOnInit() {
 
    let factore= this.activatedRoute.snapshot.params["key"];
     console.log(factore)
     this.Profile=this.PacksService.getProfile();
    this._webapp.getFactorDatiles(factore).subscribe(res=>{
      this.Factor=res;
    })
  }

  paymentType(pay:boolean,chah:boolean){
this.payment=0;
this.accept.payAtOrigin=pay;
this.accept.isCashPayment=chah;

  }
  SerchingDriver(){
    
    if(this.payment==-1)
    {
      alert("نحوه پرداخت را  انتخاب نماید");
      return;
    } 
    if(this.accept.isCashPayment==true && this.accept.isCashPayment==true)
    {
      this._webapp.getCheck().subscribe(res=>{
        debugger
        if(parseInt(this.Factor.price)>parseInt(res.credit)){
          alert("کیف خود را شارژ کنید")
        }
     
      })
    }
    else{
      this.accept.id=this.Factor.id;
      this._webapp.AcceptToSearch(this.accept).subscribe(res=>{
        this.router.navigate(['/search-driver/'+this.Factor.id]) 
      })
    }
  }
}
