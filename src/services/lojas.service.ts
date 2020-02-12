import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_CONFIG } from "../config/api.config";
import { LojasDTO } from "../models/lojas.dto";

@Injectable()
export class LojasService {
    
    constructor(public http : HttpClient){

    }

    findAll() : Observable<LojasDTO[]>{
        return this.http.get<LojasDTO[]>(`${API_CONFIG.baseUrl}/lojas`);
    }
}