import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../config/api.config";
import { MARCADTO } from "../models/marca.dto";

@Injectable()
export class MarcaService {

    constructor(public http: HttpClient){

    }

    findAll(id:number): Observable<MARCADTO[]>{

        return this.http.get<MARCADTO[]>(`${API_CONFIG.baseUrl}/marcas/${id}`);

    }

}