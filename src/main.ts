import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {akitaConfig, akitaDevtools} from "@datorama/akita";
import {SGAppModule} from "./app/app.module";

akitaConfig({
    resettable: true
});

akitaDevtools();

platformBrowserDynamic().bootstrapModule(SGAppModule)
    .catch(err => console.error(err));
