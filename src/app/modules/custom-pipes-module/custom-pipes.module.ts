import {NgModule} from "@angular/core";

import {FormatSelectPipe} from "./pipes/format-select.pipe";

@NgModule({
  declarations: [FormatSelectPipe],
  exports: [FormatSelectPipe],
})
export class CustomPipesModule {
}
