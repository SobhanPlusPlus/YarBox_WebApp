import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-address',
  templateUrl: './favorite-address.component.html',
  styleUrls: ['./favorite-address.component.css']
})
export class FavoriteAddressComponent implements OnInit {
  FavoriteAddress:any;
  FavoriteAddressDistnation:any;
  constructor( location: PlatformLocation,private router:Router) {
    location.onPopState(() => {
      history.go(1);
      this.router.navigate(["/"])
});
   }

  ngOnInit() {
    this.FavoriteAddress=JSON.parse(localStorage.getItem("Favoriteaddress"));
    this.FavoriteAddressDistnation = JSON.parse(localStorage.getItem("Favoriteaddressdestination"));
    
  }
deleteAddress(val:any){
    
  const index: number = this.FavoriteAddress.indexOf(val);
  if (index !== -1) {
      this.FavoriteAddress.splice(index, 1);
  }   
  localStorage.removeItem("Favoriteaddress");
localStorage.setItem("Favoriteaddress",JSON.stringify(this.FavoriteAddress));
}

deleteAddressDistnation(val:any){
   
  const index: number = this.FavoriteAddressDistnation.indexOf(val);
  if (index !== -1) {
      this.FavoriteAddressDistnation.splice(index, 1);
  }   
  localStorage.removeItem("Favoriteaddressdestination");
localStorage.setItem("Favoriteaddressdestination",JSON.stringify(this.FavoriteAddressDistnation));
}
 
}