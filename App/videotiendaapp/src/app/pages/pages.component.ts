import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
    this.revisarLogeo();
  }

  revisarLogeo(){
    
    if(sessionStorage.currentUser== undefined ){
      this.router.navigateByUrl("/login");
    }
  }

}
