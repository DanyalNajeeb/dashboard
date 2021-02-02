import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/auth/log-in/log-in.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import {fakeBackendProvider} from './_helpers/fake-backend';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptor/httperrorinterceptor.service';
import { HomeComponent } from './components/pages/home/home.component';
import { CreatedComponent } from './components/pages/home/tabs/created/created.component';
import { AssignedComponent } from './components/pages/home/tabs/assigned/assigned.component';
import { AcceptedComponent } from './components/pages/home/tabs/accepted/accepted.component';
import { ReachedComponent } from './components/pages/home/tabs/reached/reached.component';
import { DispatchedComponent } from './components/pages/home/tabs/dispatched/dispatched.component';
import { ReachedcustomerComponent } from './components/pages/home/tabs/reachedcustomer/reachedcustomer.component';
import { DeliveredComponent } from './components/pages/home/tabs/delivered/delivered.component';
import { CancelledComponent } from './components/pages/home/tabs/cancelled/cancelled.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import { CommentPanelComponent } from './components/shared/comment-panel/comment-panel.component';
import {UpdateComponent} from './components/shared/update/update.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { CloseModalComponent } from './components/shared/close-modal/close-modal.component';
import {MatMenuModule} from '@angular/material/menu';
import {ReusableMethodsService} from './_helpers/reusable-methods.service';
import { RejectComponent } from './components/pages/home/tabs/reject/reject.component';
import {HttpRequestInterceptor} from './interceptor/HttpRequestInterceptor';
import { mqttManager } from './_services/mqtt-manager.service';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MatCheckboxModule} from '@angular/material/checkbox';

// import { UpdateComponent } from './components/shared/update/update.component';

// import {CommentPanelComponent} from './components/shared/comment-panel/comment-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    HomeComponent,
    CreatedComponent,
    AssignedComponent,
    AcceptedComponent,
    ReachedComponent,
    DispatchedComponent,
    ReachedcustomerComponent,
    DeliveredComponent,
    CancelledComponent,
    CommentPanelComponent,
    NavComponent,
    CloseModalComponent,
    RejectComponent,
    UpdateComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatBadgeModule,
      MatListModule,
      MatGridListModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatRadioModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatChipsModule,
      MatTooltipModule,
      MatTableModule,
      MatPaginatorModule,
      MatTabsModule,
      MatExpansionModule,
      MatCardModule,
      MatMenuModule,
      MatCheckboxModule

  ],
  providers: [
    mqttManager,
    ReusableMethodsService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
    

  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CommentPanelComponent,
    CloseModalComponent,
    UpdateComponent
  ]
})
export class AppModule { }

// platformBrowserDynamic().bootstrapModule(AppModule);