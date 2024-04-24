import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule} from "@taiga-ui/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {SGAppRoutingModule} from "./app-routing.module";
import {SGAppComponent} from "./app.component";

@NgModule({
    declarations: [
        SGAppComponent
    ],
    imports: [
        BrowserModule,
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
        }
    ],
    bootstrap: [SGAppComponent]
})
export class SGAppModule {
}
