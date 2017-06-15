import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

import * as _ from "lodash";

import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { environment } from "../../../environments/environment";
import { ReplaySubject } from "rxjs/ReplaySubject";

import { IssueModel, IssueSectionModel, ProjectModel } from "./models/jira-models";
import { JiraIssueRequestConfig } from "./jira-issue-request.config";

@Injectable()
export class JiraService {
  private headers: Headers;
  private options: RequestOptions;
  private domain = 'jira.api';

  public token: string;

  public TokenUpdated = new ReplaySubject(1);
  private onTokenUpdated: any;

  public currentProject: ProjectModel;
  public ProjectUpdated = new ReplaySubject(1);

  constructor(private http: Http) { }

  private getOptions() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (this.token) {
      headers.append('Authorization', this.token);
    }

    this.headers = headers;
    this.options = new RequestOptions({ headers: this.headers });
  }

  public getIssues(): Observable<any> {
    JiraIssueRequestConfig.authorization = this.token;
    JiraIssueRequestConfig.project = this.currentProject.key;

    return this.http.post(`//${this.domain}/issues/getissues`, JiraIssueRequestConfig, this.options)
      .map(results => {
        let data = results.json();

        _.each(data.issueSections, (section: IssueSectionModel) => {
          section.disabled = (section.count < 1);
        });

        return data;
      });
  }

  public getToken(username: string, password: string): Observable<any> {
    return this.http.post(`//${this.domain}/issues/login`, {
      username: username,
      password: password,
      domain: environment.JiraBaseUrl
    }, this.options)
      .map(results => {
        let data = results.json();

        this.token = data.token;
        this.TokenUpdated.next(this.token);

        return results;
      });
  }

  public getProjects(): Observable<ProjectModel[]> {
    return this.http.post(`//${this.domain}/issues/projects`, {
      domain: environment.JiraBaseUrl
    }, this.options).map(results => {
      let data = results.json();
      let projects: ProjectModel[] = [];

      _.each(data, item => {
        let project = new ProjectModel();
        project.name = item.name;
        project.key = item.key;
        project.icon = item.avatarUrls["24x24"];

        projects.push(project);
      });

      return projects;
    });
  }

  public setCurrentProject(obj: ProjectModel): void {
    this.currentProject = obj;
    this.ProjectUpdated.next(obj);
  }

  public validateUser(): Observable<boolean> {
    this.getOptions();
    return this.http.post(`//${this.domain}/issues/validate`, { domain: environment.JiraBaseUrl }, this.options)
      .map(result => {
        return result.json();
      });
  }


  public setToken(token: string) {
    this.token = token;
    this.TokenUpdated.next(this.token);
  }

  public logout() {
    this.token = '';
    this.currentProject = undefined;
  }

}
