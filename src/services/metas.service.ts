import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { MetasDTO } from "../models/metas.dto";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class MetasService{

    constructor(public http : HttpClient){

    }

    public find(): Observable<MetasDTO[]>{

        return this.http.get<MetasDTO[]>(`${API_CONFIG.baseUrl}/metas`);

    }

    public findMetaGeral(lojasSelecionadas : string): Observable<number>{

        return this.http.get<number>(`${API_CONFIG.baseUrl}/metas/metageral?&lojas=${lojasSelecionadas}`);

    }
    public findMetaLoja(): Observable<MetasDTO[]>{

        return this.http.get<MetasDTO[]>(`${API_CONFIG.baseUrl}/metas/metaloja`);

    }

    insert(obj: MetasDTO) {

        return this.http.post(`${API_CONFIG.baseUrl}/metas`, obj, { observe: 'response', responseType: 'text' });
    
      }

      delete(id: number){

        return this.http.delete(`${API_CONFIG.baseUrl}/metas/${id}`, { observe: 'response', responseType: 'text'});
    
    }

}