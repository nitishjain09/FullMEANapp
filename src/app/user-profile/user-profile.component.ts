import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userObj;

  constructor(private hc: HttpClient) { }

  ngOnInit(): void {
    //first approach:make http get req to user -api
    //second approach: get user data from local storage
    this.userObj = JSON.parse(localStorage.getItem("userObj"));
  }

  getPrivateData(){
    this.hc.get('/user/testing').subscribe(
      res => {
        alert(res['message']);
      },
      err => {
        console.log(err);
        alert(err.message);
      }
    )
  }
}
