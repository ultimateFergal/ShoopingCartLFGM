import { Component, OnInit, isDevMode } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  ipAddress: string;

  constructor( private http: Http) { }

  ngOnInit() {
    this.getClientIpAdress();
    if(localStorage.getItem(`cartBaraton${this.ipAddress}`) != null){
      localStorage.removeItem(`cartBaraton${this.ipAddress}`)
    }
  }

  getClientIpAdress(): void{
    if (isDevMode()){
      this.ipAddress = "127.0.0.1";
    } else {
      this.http.get('http://l2.io/ip.js?var=myip')
        .subscribe( data => {
          this.ipAddress = JSON.stringify(data).replace('"myip = "', "").replace('";', "")
          //this.ipAddress = data.myip;
          //console.log(data);
      })
    }
  }

}
