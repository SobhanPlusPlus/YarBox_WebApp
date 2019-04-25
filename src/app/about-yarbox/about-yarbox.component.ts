import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-about-yarbox',
  templateUrl: './about-yarbox.component.html',
  styleUrls: ['./about-yarbox.component.css']
})
export class AboutYarboxComponent implements OnInit {

  constructor(  private router:Router, location: PlatformLocation) { 
    location.onPopState(() => {
      // history.go(1);
      debugger
     this.router.navigate(["/"])
});
}

  ngOnInit() {
  }

}
