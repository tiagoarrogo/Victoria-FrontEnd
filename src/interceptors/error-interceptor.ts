import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { StorageService } from '../services/storage.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertController: AlertController){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }  
           
            switch(errorObj.status){
                case 401:
                this.handle401();
                break;

                case 403:
                this.handle403();
                break;

                case 500:
                this.handle500();
                break;

                default:
                this.handleDefaultError(errorObj);
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    handle403(){

        this.storage.setLocalUser(null);

    }

    handle401(){
        let alert = this.alertController.create({
            title: 'Erro 401: falha de autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }
    handle500(){
        let alert = this.alertController.create({
            title: 'Erro 500: falha de Integridade de dados',
            message: 'Verifique as dependências!',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    handleDefaultError(errorObj){

        let alert = this.alertController.create({
            title: 'Erro' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();

    }
}  

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
