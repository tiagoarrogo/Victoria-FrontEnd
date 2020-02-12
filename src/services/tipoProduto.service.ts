import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { TIPOPRODUTODTO } from "../models/tipoProduto.dto";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class TipoProdutoService {

    constructor(public http: HttpClient){

    }

    findAll(): Observable<TIPOPRODUTODTO[]>{

        return this.http.get<TIPOPRODUTODTO[]>(`${API_CONFIG.baseUrl}/tipoprodutos`);

    }

}