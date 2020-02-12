import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LojasService } from '../../services/lojas.service';
import { LojasDTO } from '../../models/lojas.dto';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MetasService } from '../../services/metas.service';
import { MetasDTO } from '../../models/metas.dto';
import { VendasService } from '../../services/vendas.services';
import { VendasDTO } from '../../models/vendas.dto';
import { ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';





@IonicPage()
@Component({
  selector: 'page-mapa-analitico-vendas',
  templateUrl: 'mapa-analitico-vendas.html',
})
export class MapaAnaliticoVendasPage {


  lojas: LojasDTO[];
  public metas: number;
  formGroup: FormGroup;
  public metasLoja: MetasDTO[];
  public detalheMetas: boolean = false;
  public totalFaturamento: string;
  public dataFaturamento: string;
  filtroLoja: string = "";
  faturamentoMarca: VendasDTO[];
  faturamentoMultifocal: VendasDTO[];
  faturamentoLentes: VendasDTO[];
  faturamentoVendedores: VendasDTO[];
  fatSolarRx: VendasDTO[];

  carregou: boolean = false;
  carregou2: boolean = false;
  formaRecebimento: VendasDTO[];
  lojasSelecionadas = [];
  public pieChartLabels2 = [];
  public pieChartData2 = [{ data: [], label: [] }];
  public pieChartLabels = [];
  public pieChartData = [{ data: [], label: [] }];


  constructor(public vendasService: VendasService, public alertCtrl: AlertController, public formBuilder: FormBuilder, public metasService: MetasService, public navCtrl: NavController, public navParams: NavParams, public lojasService: LojasService) {
  }

  ionViewDidLoad() {

    this.metasService.findMetaLoja()
      .subscribe(response => {

        this.metasLoja = response;


      }, error => { });



  }

  detailMetas() {

    

    this.detalheMetas = true;



  }
  closeDetailMetas() {

    this.detalheMetas = false;



  }



  grafico(ev: any) {


    var contador = 1;
    var qcampos = 0;

    if (this.lojasSelecionadas.toString() == "TODAS") {


      this.lojasSelecionadas.pop();

      for (var l in this.metasLoja) {

        this.lojasSelecionadas.push(this.metasLoja[l].nome_Loja);

      }

    }


    qcampos = this.lojasSelecionadas.length;

    for (var i in this.lojasSelecionadas) {



      if (contador < qcampos) {

        this.filtroLoja = "'" + this.lojasSelecionadas[i] + "'" + ',' + this.filtroLoja;

        contador = contador + 1;


      } else {

        this.filtroLoja = this.filtroLoja + "'" + this.lojasSelecionadas[i] + "'";

        contador = contador + 1;

      }

    }

    this.metasService.findMetaGeral(this.filtroLoja)
      .subscribe(response => {

        this.metas = response;
        

      }, error => { });

    this.vendasService.vendaGeral(this.filtroLoja)
      .subscribe(response => {

        for (var fat in response) {

          this.dataFaturamento = response[fat].anoVenda;
          this.totalFaturamento = response[fat].total;

        }

      }, error => { });

    this.vendasService.rankingMarca(this.filtroLoja)
      .subscribe(response => {

        this.faturamentoMarca = response;

      }, error => { });

    this.vendasService.rankingMultifocal(this.filtroLoja)
      .subscribe(response => {

        this.faturamentoMultifocal = response;

      }, error => { });

    this.vendasService.rankingLentes(this.filtroLoja)
      .subscribe(response => {

        this.faturamentoLentes = response;

      }, error => { });

    this.vendasService.rankingVendedores(this.filtroLoja)
      .subscribe(response => {

        this.faturamentoVendedores = response;

      }, error => { });


    this.pieChartLabels = [];
    this.pieChartData = [{ data: [], label: [] }];

    this.vendasService.rankingSolarRx(this.filtroLoja)
      .subscribe(response => {

        this.fatSolarRx = response;

        this.fatSolarRx.forEach(y => {


          this.pieChartData.forEach((dataset, index) => {
            this.pieChartData[index] = Object.assign({}, this.pieChartData[index], {
              data: [...this.pieChartData[index].data, y.qtdeVenda]


            });

            this.pieChartLabels = [...this.pieChartLabels, y.prod_Marca];
            this.carregou = true;

          });
        });

        this.carregou = true;

      }, error => { });

    this.carregaRanking();

    this.filtroLoja = "";
  }


  carregaRanking() {


    this.pieChartLabels2 = [];
    this.pieChartData2 = [{ data: [], label: [] }];

    this.vendasService.rankingFormaRecebimento(this.filtroLoja)
      .subscribe(response => {
        this.formaRecebimento = response;

        this.formaRecebimento.forEach(y => {


          this.pieChartData2.forEach((dataset, index) => {
            this.pieChartData2[index] = Object.assign({}, this.pieChartData2[index], {
              data: [...this.pieChartData2[index].data, y.qtdeVenda]


            });

            this.pieChartLabels2 = [...this.pieChartLabels2, y.prod_Marca];
          });
        });

        this.carregou2 = true;

      }, error => { });
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
      labels: {
        fontSize: 10
      }
    },
    layout: {
      padding: {
        left: 10,
        right: 0,
        top: 0,
        bottom: 0
      }
    }
  };


  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)'],
    },
  ];



  public pieChartOptions2: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
      labels: {
        fontSize: 10
      }
    },
    layout: {
      padding: {
        left: 10,
        right: 0,
        top: 0,
        bottom: 0
      }
    }
  };


  public pieChartLegend2 = true;
  public pieChartPlugins2 = [pluginDataLabels];
  public pieChartColors2 = [
    {
      backgroundColor: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
      ],
    },
  ];


}