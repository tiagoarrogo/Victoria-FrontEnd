import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendasPage } from './vendas';
import { ChartsModule } from 'ng2-charts-x';

@NgModule({
  declarations: [VendasPage],
  imports: [
    IonicPageModule.forChild(VendasPage),
    ChartsModule
  ],
})
export class VendasPageModule {}
