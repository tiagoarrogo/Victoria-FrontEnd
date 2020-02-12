import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupAddPage } from './signup-add';

@NgModule({
  declarations: [
    SignupAddPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupAddPage),
  ],
})
export class SignupAddPageModule {}
