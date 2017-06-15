import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { AccordionModule  } from "ngx-bootstrap/accordion";

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { JiraModule } from "../services/jira/jira.module";
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AccordionModule.forRoot(),
    JiraModule,
    ChartsModule
  ],
  declarations: [DashboardComponent],
  providers: []
})
export class DashboardModule { }
