import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JiraService } from "./jira.service";

@NgModule({
  imports: [CommonModule],
  declarations: []
})
export class JiraModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: JiraModule,
      providers: [JiraService]
    }
  }
}
