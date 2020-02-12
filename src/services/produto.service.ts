import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ProdutoDTO } from "../models/produtos.dto";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient){

    }

    findAll(codigoMarca : number, codigoTpLente:number) : Observable<ProdutoDTO[]> {

        return this.http.get<ProdutoDTO[]>(`${API_CONFIG.baseUrl}/produtos/lista?codigoMarca=${codigoMarca}&codigoTpLente=${codigoTpLente}`);
    }



    

}