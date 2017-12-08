import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-o-auth',
  templateUrl: './o-auth.component.html',
  styleUrls: ['./o-auth.component.css']
})
export class OAuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.opener.postMessage(({
      type: 'OAuth',
      data: location.href
    }), '*');
  }

}
