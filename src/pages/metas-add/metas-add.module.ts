import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MetasAddPage } from './metas-add';

@NgModule({
  declarations: [
    MetasAddPage,
  ],
  imports: [
    IonicPageModule.forChild(MetasAddPage),
  ],
})
export class MetasAddPageModule {}
