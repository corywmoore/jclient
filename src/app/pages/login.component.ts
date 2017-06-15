import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { CookieService } from "ngx-cookie";
import { JiraService } from "../services/jira/jira.service";
import * as moment from 'moment';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  public message: string;
  public username: string;
  public password: string;
  private token: string;

  private onTokenUpdated: any;

  constructor(private jira: JiraService, private cookieService: CookieService, private router: Router) {
    this.token = cookieService.get('token');
    if (this.token) {
      jira.setToken(this.token);
    }

    this.onTokenUpdated = jira.TokenUpdated.subscribe(() => {
      this.token = jira.token;

      if (this.token) {
        router.navigateByUrl('/dashboard');
      }
    })
  }

  public login() {
    this.jira.getToken(this.username, this.password)
      .subscribe(response => {
        if (response.status === 401) {
          this.message = "Wrong username or password";
          return;
        } else if (response.status === 403) {
          this.message = "You do not have access to these reports";
          return;
        }

        let data = response.json();
        this.token = data.token;

        var date = moment(moment.now());
        this.cookieService.put('token', this.token, { expires: date.add(1, 'day').format() })

      }, error => {
        console.error('error during login', error);
      });
  }
}
