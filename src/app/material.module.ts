import { NgModule } from '@angular/core';
import { MatButtonModule,
  MatInputModule,
  MatFormFieldModule, MatDatepickerModule,
  MatNativeDateModule, MatCheckboxModule
 } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule,MatDatepickerModule, MatNativeDateModule
  ,MatCheckboxModule],
  exports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule
    ,MatCheckboxModule]
})
export class MaterialModule {

}
