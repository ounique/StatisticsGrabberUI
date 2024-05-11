import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule} from "@taiga-ui/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {APP_INITIALIZER, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {SGAppRoutingModule} from "./app-routing.module";
import {SGAppComponent} from "./app.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {appBootstrap} from "./app.bootstrap";
import {SGAppConfigDataService} from "./services/app-config.service";
import {SGHealthDataService} from "./services/health.service";
import {SGAppService} from "./state/app.service";
import {NgChartsModule} from 'ng2-charts';

@NgModule({
    declarations: [
        SGAppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        SGAppRoutingModule,
        BrowserAnimationsModule,
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule
    ],
    providers: [
        {
            provide: TUI_SANITIZER,
            useClass: NgDompurifySanitizer
        },
        {
            provide: APP_INITIALIZER,
            useFactory: appBootstrap,
            deps: [
                HttpClient,
                SGAppConfigDataService,
                SGHealthDataService,
                SGAppService
            ],
            multi: true
        }
    ],
    bootstrap: [SGAppComponent]
})
export class SGAppModule {
}
