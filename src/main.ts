import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {SGAppModule} from "./app/app.module";

platformBrowserDynamic().bootstrapModule(SGAppModule)
    .catch(err => console.error(err));
