import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { VendasDTO } from "../models/vendas.dto";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class VendasService {
    items : VendasDTO[];
    constructor(public http : HttpClient){

    }

    findAll(lojasSelecionadas : string, anos : string) : Observable<VendasDTO[]>{
        return this.http.get<VendasDTO[]>(`${API_CONFIG.baseUrl}/vendas/anos?&Anos=${anos}&lojas=${lojasSelecionadas}`);
    }
    findMonth(meses : string, anos: string, lojas : string) : Observable<VendasDTO[]>{
        return this.http.get<VendasDTO[]>(`${API_CONFIG.baseUrl}/vendas/mes?mesinicial=${meses}&anos=${anos}&lojas=${lojas}`);
    }
    findDay(anosSelecionados : string, mesesSelecionados: string, diasSelecionados: string, lojas : string) : Observable<VendasDTO[]>{
        return this.http.get<VendasDTO[]>(`${API_CONFIG.baseUrl}/vendas/dias?anos=${anosSelecionados}&meses=${mesesSelecionados}&dias=${diasSelecionados}&lojas=${lojas}`);
    }

    vendaGeral(lojasSelecionadas : string) : Observable<VendasDTO[]>{    
        return this.http.get<VendasDTO[]>(`${API_CONFIG.baseUrl}/vendas/vendageral?&lojas=${lojasSelecionadas}`);
    }
    rankingMarca(lojasSelecionadas : string) : Observable<VendasDTO[]>{    
        return this.http.get<VendasDTO[]>(`${API_CONFIG.baseUrl}/vendas/rankingmarca?&lojas=${lojasSelecionadas}`);
    }
    rankingMultifocal(lojasSelecionadas : string) : Observable<VendasDTO[]>{    
        return this.http.get<VendasDTO[]>(`${API_CONFIG.baseUrl}/vendas/rankingmultifocal?&lojas=${lojasSelecionadas}`);
    }
    rankingLentes(lojasSelecionadas : string) : Observable<VendasDTO[]>{    
        return this.http.get<VendasDTO[]>(`${API_CONFIG.baseUrl}/vendas/rankinglentes?&lojas=${lojasSelecionadas}`);
    }
    rankingVendedores(lojasSelecionadas : string) : Observable<VendasDTO[]>{    
        return this.http.get<VendasDTO[]>(`${API_CONFIG.baseUrl}/vendas/rankingvendedor?&lojas=${lojasSelecionadas}`);
    }
    rankingSolarRx(lojasSelecionadas : string) : Observable<VendasDTO[]>{    
        return this.http.get<VendasDTO[]>(`${API_CONFIG.baseUrl}/vendas/rankingsolarrx?&lojas=${lojasSelecionadas}`);
    }
    rankingFormaRecebimento(lojasSelecionadas : string) : Observable<VendasDTO[]>{    
        return this.http.get<VendasDTO[]>(`${API_CONFIG.baseUrl}/vendas/rankingformarecebimento?&lojas=${lojasSelecionadas}`);
    }




}