import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaAnaliticoVendasPage } from './mapa-analitico-vendas';
import { ChartsModule } from 'ng2-charts-x';

@NgModule({
  declarations: [
    MapaAnaliticoVendasPage,
  ],
  imports: [
    IonicPageModule.forChild(MapaAnaliticoVendasPage),
    ChartsModule
  ],
})
export class MapaAnaliticoVendasPageModule {}
