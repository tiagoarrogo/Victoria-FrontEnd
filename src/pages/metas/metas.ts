import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { MetasDTO } from '../../models/metas.dto';
import { MetasService } from '../../services/metas.service';





@IonicPage()
@Component({
  selector: 'page-metas',
  templateUrl: 'metas.html',
})
export class MetasPage {

  items: MetasDTO[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public metasService: MetasService, public modalController: ModalController) {
  }

  ionViewDidLoad() {
    
    this.metasService.find()
    .subscribe(response =>{

      this.items = response;

    }, error => {

    });

  }

  alertConfirmDelete(id: number) {

    let alert = this.alertCtrl.create({
      title: 'Confirma!',
      message: '<strong>Deseja deletar a meta?</strong>',
      buttons: [{
        text: 'Cancelar',
        role: 'cancelar',
        cssClass: 'secondary',
        handler: () => {

        }

      }, {
        text: 'Ok',
        handler: () => {


          this.metasService.delete(id)
          .subscribe(response =>{

            this.ionViewDidLoad();
      
          }, error =>{
      
          });
        }
      }]
    });

    alert.present();
  }


  removeMeta(id:number){

   this.alertConfirmDelete(id);


  }

  

 addMeta() {

  this.navCtrl.push('MetasAddPage');

    
 }

}
