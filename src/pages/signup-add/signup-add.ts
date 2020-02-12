import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';


@IonicPage()
@Component({
  selector: 'page-signup-add',
  templateUrl: 'signup-add.html',
})
export class SignupAddPage {

  formGroup: FormGroup;
  messageEmail = "";
  messagePassword = "";
  errorEmail = false;
  errorPassword = false;
  
  constructor(public formBuilder: FormBuilder,
              public navCtrl: NavController, 
              public navParams: NavParams,
              public userService: UsuarioService,
              public alertCtrl: AlertController) {

    this.formGroup = this.formBuilder.group({
     email: ['', Validators.required],
     senha:['', Validators.required],
     loja:['']
    })
  }

  ionViewDidLoad() {
    
  }

  addUser(){
    let {email, senha} = this.formGroup.controls;

    if(!this.formGroup.valid){
      if(!email.valid){
        this.errorEmail = true;
        this.messageEmail = "Preencha o E-mail!";
      }else{
        this.messageEmail = "";
      }

      if(!senha.valid){
        this.errorPassword = true;
        this.messagePassword = "Preencha a senha!";
      }else{
        this.messagePassword = "";
      }

    }else{
       this.userService.insert(this.formGroup.value)
    .subscribe(response =>{
      this.showInsertOk();

    }, error =>{});
    }

   
  }
  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
           this.navCtrl.setRoot('SignupPage');
            
          }
        }
      ]
    });
    alert.present();
  }

  

}
