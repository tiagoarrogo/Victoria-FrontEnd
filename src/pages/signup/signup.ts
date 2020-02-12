import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioDTO } from '../../models/usuario.dto';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  items : UsuarioDTO[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public users : UsuarioService,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
   this.users.findAll()
   .subscribe(response =>{
     this.items = response;
   }, error => {
    
   });
  }

  formAddUser(){    
    this.navCtrl.push('SignupAddPage');
  }

  formRemoveUser(id : number){

    try {
      this.users.delete(id);
      this.showDeleteOk();
      
    } catch (error) {
      
    }
    

  }

  showDeleteOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Usuário deletado com sucesso!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
           this.ionViewDidLoad();
            
          }
        }
      ]
    });
    alert.present();
  }

}
