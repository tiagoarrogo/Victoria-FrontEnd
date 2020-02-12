import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TipoProdutoService } from '../../services/tipoProduto.service';
import { TIPOPRODUTODTO } from '../../models/tipoProduto.dto';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MarcaService } from '../../services/marca.service';
import { MARCADTO } from '../../models/marca.dto';


@IonicPage()
@Component({
  selector: 'page-tabelapreco',
  templateUrl: 'tabelapreco.html',
})
export class TabelaprecoPage {

  formGroup: FormGroup;
  items: TIPOPRODUTODTO[];
  marcas: MARCADTO[];

  constructor(public navCtrl: NavController, 
              public formBuilder: FormBuilder,
              public tipoProdutoService: TipoProdutoService,
              public marcaService: MarcaService,
              public navParams: NavParams
              ) {

                this.formGroup = this.formBuilder.group({
                 
                  codProduto: ['']          
            
                });
            
  }

  ionViewDidLoad() {

    this.tipoProdutoService.findAll()
    .subscribe(response =>{

      this.items = response;      

    }, error =>{});
    
  }

  buscaMarcas(){

    if(this.formGroup.get('codProduto').value == 0){

      let codProduto = this.formGroup.get('codProduto').value;

     this.navCtrl.push('ProdutosPage', {marcaCodigo: 0, tpLenteCodigo: codProduto });

      
    }


    this.marcaService.findAll(this.formGroup.get('codProduto').value)
    .subscribe(response =>{
      this.marcas = response;
    }, error =>{});

  }

  showProdutos(marca: number){

    let codProduto = this.formGroup.get('codProduto').value;

     this.navCtrl.push('ProdutosPage', {marcaCodigo: marca, tpLenteCodigo: codProduto });
  }

}
