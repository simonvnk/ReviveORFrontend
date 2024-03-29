import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../shared/services/auth/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
      this.authenticationService.logout();
      this.router.navigate(['']);
  }

}
