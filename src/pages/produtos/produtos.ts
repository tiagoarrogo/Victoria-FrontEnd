import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ProdutoService } from '../../services/produto.service';
import { ProdutoDTO } from '../../models/produtos.dto';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(public loadingController: LoadingController, public alertController: AlertController, public navCtrl: NavController, public navParams: NavParams, public produtoService: ProdutoService) {
  }



  ionViewDidLoad() {

    const loading =  this.loadingController.create({
      
      duration: 2000
    });

    loading.present();

    let marcaCodigo = this.navParams.get('marcaCodigo');
    let tpLenteCodigo = this.navParams.get('tpLenteCodigo');

    this.produtoService.findAll(marcaCodigo, tpLenteCodigo)
    .subscribe(response =>{

      this.items = response;   
      
      

    }, error => {});

     

    

  }

  detalharProduto(bonus: number){

   
      const alert =  this.alertController.create({
        
        
        title: 'Detalhes do Produto',
        message: 'Valor Bônus: ' + bonus,
        buttons: ['OK']
      });
  
       alert.present();

  }

  getItems(ev: any) {
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.ionViewDidLoad();
    }
  }



}
