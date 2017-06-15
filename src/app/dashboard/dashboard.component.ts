import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CookieService } from "ngx-cookie";
import * as moment from 'moment';
import * as _ from 'lodash';

import { ResultsModel, SubtaskModel, ProjectModel } from "../services/jira/models/jira-models";
import { JiraService } from "../services/jira/jira.service";

@Component({
  templateUrl: 'dashboard.component.html',
  styles: ['dashboard.component.scss'],
  providers: [CookieService]

})
export class DashboardComponent implements OnInit {
  public token: string;
  public data: ResultsModel;
  public message: string;

  public chartLabels: string[];
  public chartData: number[];

  private onTokenUpdate: any;

  public project: ProjectModel;
  private onProjectUpdate: any;

  constructor(private jira: JiraService, private cookieService: CookieService, private router: Router) {
    this.onTokenUpdate = jira.TokenUpdated.subscribe(() => {
      this.token = jira.token;
      this.getData();
    });

    this.onProjectUpdate = jira.ProjectUpdated.subscribe(() => {
      this.project = jira.currentProject;
      this.getData();
    });
  }

  ngOnInit() {
    this.getData();
  }

  private getData() {
    if (this.project) {
      this.jira.getIssues().subscribe(data => {
        this.data = data;
        this.buildChartData();
      });
    }
  }

  private buildChartData() {
    this.chartData = [];
    this.chartLabels = [];

    _.each(this.data.issueSections, item => {
      this.chartData.push(item.count);
      this.chartLabels.push(item.name);
    });
  }
}
