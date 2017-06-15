import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie";
import { JiraService } from "../services/jira/jira.service";
import { ProjectModel } from "../services/jira/models/jira-models";

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  providers: []
})
export class FullLayoutComponent implements OnInit {
  public token: string;
  private onTokenUpdate: any;

  public projectsData: ProjectModel[];

  public disabled = false;
  public status: { isopen: boolean } = { isopen: false };

  constructor(private cookieService: CookieService, private jiraService: JiraService, private router: Router) {
    this.token = cookieService.get('token');

    this.onTokenUpdate = jiraService.TokenUpdated.subscribe(() => {
      this.token = jiraService.token;
      this.getProjects();
    });
  }

  public toggled(open: boolean): void {
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  public logout() {
    this.cookieService.removeAll();
    this.jiraService.logout();
    this.router.navigateByUrl('/pages/login');
  }

  private getProjects() {
    if (this.token) {
      this.jiraService.getProjects()
        .subscribe(response => {
          this.projectsData = response;
        });
    }
  }

  public switchProject(project: ProjectModel) {
    this.jiraService.setCurrentProject(project);
    this.router.navigateByUrl('/dashboard');
  }

  ngOnInit(): void { }
}
