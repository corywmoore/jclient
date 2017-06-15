import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { JiraService } from "../../services/jira/jira.service";

@Injectable()
export class UserIdentityGuard implements CanActivate {
  constructor(private jira: JiraService, private router: Router) {
}
  canActivate(): Observable<boolean> {
    let response = this.jira.validateUser();

    response.subscribe(is => {
      if (!is) {
        this.router.navigateByUrl('/pages/login');
      }
    });

    return response;
  }
}
