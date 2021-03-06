import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { authenticationService } from './authentication/authentication-Service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { DeviceDetectorService } from 'ngx-device-detector';
import { fadeAnimation } from './Shared/fade.animation';
import { WebAppService } from './Services/webapp-service';
import  $ from 'jquery';
import { SwUpdate } from '@angular/service-worker';
import { ProfileDto } from './Core/DTO/Profile-dto';
import { Observable, fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { PackService } from './Services/Pack-Service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})
export class AppComponent  implements OnInit{
  deviceInfo = null;
  @ViewChild('ModalProfile') private ModalProfile: ElementRef;  
  @ViewChild('openmodal') private openmodal: ElementRef;
  online$: Observable<boolean>;
  ngOnInit(): void {
    // this.PackService.setOnLocalStorageEmpty();
    // if (window.matchMedia('(display-mode: standalone)').matches) {
    //   alert("Thank you for installing our app!");
    // }
   
this.getPlants().subscribe(res=>{
 
  let homescreen=JSON.parse(localStorage.getItem("add-homescreen"))
  
  if (res.isMobile==false){
    
    this.router.navigate(["/WebPlatform"])
    return;
  }
  else if ((this.deviceInfo.browser=="safari" || this.deviceInfo.browser=="Safari") && homescreen==false && window.matchMedia('(display-mode: standalone)').matches==false){
 
        this.router.navigate(["/ios-home-screen"])
        return
  }
//   else if (this.deviceInfo.device=="android"){
//     this.router.navigate(["/android-home-screen"])
// }
  else{
     this._auth.IsLoginOnServer().subscribe(res=>{
        
       this._auth.setIsLogin(true);
       this.jsonProfile = JSON.parse(localStorage.getItem("Profile"));
       this._auth.setProfile(this.jsonProfile);
       this._webApp.getPackrunning().subscribe(res=>{
       let count=res.filter(x=> x.isCanceled==false).length
 
      if(this.jsonProfile.lastName=="نام خانوادگی"){
        this.openmodal.nativeElement.click();  
      }
})
     },(err) => {
       
       if(err.status==401){
      this._auth.setIsLogin(false);
      this.router.navigate(["/login"]);
       }
    })
  }
 // this._auth.setIsLogin(false);
})


  }
  title = 'webapp';
  jsonProfile:any;
  constructor(
    private _auth :authenticationService,
    private router: Router,
    private _webApp:WebAppService,
    public swUpdate: SwUpdate,
     private deviceService: DeviceDetectorService,
     private PackService:PackService){
 
      this.getPlants().subscribe(res=>{
        if (res.isMobile==false){
    
          this.router.navigate(["/WebPlatform"])
          return;
        }
       let homescreen=JSON.parse(localStorage.getItem("add-homescreen"))
       if(homescreen==null){
         localStorage.setItem("add-homescreen","false")
       }
       else if(homescreen==true){
        this._webApp.getCheck().subscribe(res=>{
          this.PackService.uodateCredit(res.credit);
        })
       }
      });
      this.epicFunction();
      if(this.swUpdate.isEnabled)
      {
        this.swUpdate.available.subscribe(()=> {
          swal.fire({
            position: 'center',
            type: 'success',
            title: 'یار باکس بروز شد',
            showConfirmButton: true,
          confirmButtonText:"باشه",
          }).then(function (result) {
            
            window.location.reload();
          })
       
          
        })
      }
   this.checkNet();

  }
  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
  public getLodingStatus(){
  
    return this._webApp.getLoding();
  }
public getIsLogin(){
  
  return this._auth.getIsLogin();
}
  SingOut(){
    this._webApp.SingOut().subscribe(res=>{
      this.jsonProfile=null;
      this._auth.setIsLogin(false);
      this._auth.clearProfile();
      this.router.navigate(["/login"])
    })
  }
  hideMnu(){
     
   var classmnu= $('#sidebar-wrapper').attr('class');
 
   var find = classmnu.search("active");
   if(find!=-1)
    $("#sidebar-wrapper").toggleClass("active");

  }
  public getProfile(){
    
    return this._auth.getProfile;
  }
  UpdateProfiele(lname:string,fname:string){
let profile ={
  firstName: fname,
  lastName: lname,
  phoneNumber: JSON.parse(localStorage.getItem("Profile")).phoneNumber
}
this._webApp.UpdateUser(profile).subscribe(res=>{
 
 
  
  this._auth.getProfileOnApi().subscribe(res=>{
    this.ModalProfile.nativeElement.click();  
  })
})
  }

  checkNet(){
   
     
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    )
    this.networkStatus()
  }

  public networkStatus() {
    //<button (click)="TryNet()" >سعی مجدد</button>
    this.online$.subscribe(value => {
      this._webApp.setIsNet(value);
      console.log("Net "+value);
       
      if(value!=true)
      this.SweetNet();
 {

 }
    })
  }
 

  SweetNet(){
    let self=this;
    swal.fire({
      title: 'عدم دسترسی به شبکه!',
      text: 'لطفا دسترسی خود را به شبکه اینترنت چک نماید',
 
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText:"سعی مجدد",
      allowOutsideClick: false,
    }) .then(function (result) {
      if(!self._webApp.getIsNet)
      self.SweetNet();
      else{    
        if(!self._auth.getIsLogin()){
              self.PackService.setOnLocalStorageEmpty();
              self.router.navigate(["/login"])
        }
          else
            self.router.navigate(["/"])
        }
    })
     
  }

  epicFunction() {
    
  }

  public getPlants(): Observable<any> {
    console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
       
    if(this.deviceInfo.os=="Android" || this.deviceInfo.os=="android"){
      this.PackService.setDivice(3)
    }
    else if (this.deviceInfo.os=="mac" || this.deviceInfo.os=="Mac" || this.deviceInfo.os=="iOS"){
      this.PackService.setDivice(4)
    }
    return of({isMobile});
  }
}
