import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IconsModule } from '../ng-zorro/icons.module';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardLogoComponent } from './dashboard-logo/dashboard-logo.component';
import { RouterModule } from '@angular/router';

registerLocaleData(en);

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardContentComponent,
    DashboardHeaderComponent,
    DashboardLogoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzMenuModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    IconsModule,
  ],
  exports: [DashboardComponent],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class UiDashboardModule {}
