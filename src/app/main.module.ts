import {NgModule, Type} from "@angular/core";
import {SGMainComponent} from "./main.component";
import {CommonModule} from "@angular/common";
import {SGMainRoutingModule} from "./main-routing.module";
import {SGHeaderComponent} from "./modules/header/header.component";
import {SGFooterComponent} from "./modules/footer/footer.component";

const taigaModules: Type<any>[] = [];

const sgModules: Type<any>[] = [
    SGHeaderComponent,
    SGMainRoutingModule,
    SGFooterComponent
];

@NgModule({
    imports: [
        CommonModule,
        ...taigaModules,
        ...sgModules
    ],
    declarations: [
        SGMainComponent
    ]
})

export class SGMainModule {
}
