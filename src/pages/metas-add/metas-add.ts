import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LojasService } from '../../services/lojas.service';
import { LojasDTO } from '../../models/lojas.dto';
import { MetasService } from '../../services/metas.service';
import { ViewController } from 'ionic-angular/navigation/view-controller';



@IonicPage()
@Component({
  selector: 'page-metas-add',
  templateUrl: 'metas-add.html',
})
export class MetasAddPage {

  formGroup: FormGroup;
  itemsLoja: LojasDTO[];
  constructor( public viewCtrl: ViewController, public alertCtrl: AlertController, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public lojasService:LojasService, public metasService: MetasService) {


    this.formGroup = this.formBuilder.group({
      nome_Loja :['', Validators.required],      
      mes_Meta:['', Validators.required],
      valor_Meta:['', Validators.required]
    })

  }

  ionViewDidLoad() {
    
    this.lojasService.findAll()
    .subscribe(response =>{

      this.itemsLoja = response;

    }, error =>{

    })

  }

  
  formatCampos(){

    var {valor_Meta} = this.formGroup.controls;

    var valor_meta = 0;

    valor_meta = parseFloat(valor_Meta.value);

    this.formGroup.get('valor_Meta').setValue(valor_meta.toFixed(2));
  }


  addMeta(){

    
    this.metasService.insert(this.formGroup.value)
    .subscribe(response =>{

      this.showInsertOk();
      

    }, error =>{

    })

    


  }

  
  formClose(){
    this.viewCtrl.dismiss();
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
           
            this.navCtrl.setRoot('MetasPage');
            
          }
        }
      ]
    });
    alert.present();
  }


}
