import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SGMainComponent} from "./main.component";

const routes: Routes = [
    {
        path: "",
        component: SGMainComponent
        // children: [
        //     {
        //         path: "",
        //         pathMatch: "full",
        //         component: SGMainComponent
        //     },
        //     // {
        //     //     path: CMRoutePath.ENTRY,
        //     //     loadChildren: (): any => import("./modules/entry/entry.module").then(m => m.CMEntryModule),
        //     //     data: {
        //     //         state: CMRoutePath.ENTRY
        //     //     }
        //     // },
        //     {
        //         path: "**",
        //         redirectTo: "/page-not-found"
        //     }
        // ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SGMainRoutingModule {
}
