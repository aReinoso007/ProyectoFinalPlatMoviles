import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  usuario: User = new User();
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.setUserData();
  }

  setUserData(){
    this.usuario = this.authService.getCurrentUsr()
  }

}
