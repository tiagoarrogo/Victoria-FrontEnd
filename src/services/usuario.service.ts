import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UsuarioDTO } from "../models/usuario.dto";
import { API_CONFIG } from "../config/api.config";
import { Observable } from "rxjs/Rx";

@Injectable()
export class UsuarioService {

    constructor(public http : HttpClient){

    }

    findAll() : Observable<UsuarioDTO[]> {

        return this.http.get<UsuarioDTO[]>(`${API_CONFIG.baseUrl}/users`);

    }

    insert(obj : UsuarioDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/users`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
    delete(id : number) {

        return new Promise((resolve, reject) => {
          
            this.http.delete(`${API_CONFIG.baseUrl}/users/${id}`)
              .subscribe((result: any) => {
                resolve(result);
              },
              (error) => {
                reject(error);
              });
          });
    }
}