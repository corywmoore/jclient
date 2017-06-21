import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie";
import { JiraService } from "../services/jira/jira.service";
import { ProjectModel } from "../services/jira/models/jira-models";
import * as _ from "lodash";

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  providers: []
})
export class FullLayoutComponent implements OnInit {
  public token: string;
  private onTokenUpdate: any;

  public projectsData: ProjectModel[];
  public originalProjectsData: ProjectModel[];
  public searchterm: string;

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
          this.originalProjectsData = response;
          this.copyData();
        });
    }
  }

  private copyData() {
    this.projectsData = Object.assign([], this.originalProjectsData);
  }

  public filterItems(value: string) {
    if (!value) {
      this.copyData();
    }
    this.projectsData = Object.assign([], this.originalProjectsData).filter(item =>
      item.name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
      item.key.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }

  public switchProject(project: ProjectModel) {
    this.jiraService.setCurrentProject(project);
    this.router.navigateByUrl('/dashboard');
  }

  ngOnInit(): void { }
}
