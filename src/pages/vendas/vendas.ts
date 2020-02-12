import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { VendasDTO } from "../../models/vendas.dto";
import { VendasService } from "../../services/vendas.services";
import { ChartOptions } from "chart.js";

import { LojasService } from "../../services/lojas.service";
import { LojasDTO } from "../../models/lojas.dto";




@IonicPage()
@Component({
  selector: 'page-vendas',
  templateUrl: 'vendas.html',
})
export class VendasPage {



  formGroup: FormGroup;
  items: VendasDTO[];
  lojas: LojasDTO[];
  public chartLabels = [];
  public chartData = [{ data: [], label: [] }];
  public carregou: boolean = false;
  anos = new Set();
  meses = new Set();
  dias = new Set();
  chart: Chart;

  constructor(public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public vendasService: VendasService,
    public lojasService: LojasService
  ) {


    this.formGroup = this.formBuilder.group({

      lojasSelecionadas: [''],
      dataInicial: [''],
      dataFinal: [''],
      periodoSelecionado: [''],
      anosSelecionados: [],
      mesesSelecionados: [],
      diasSelecionados: []


    });

  }

 

  limpaCampos() {
    this.formGroup.get('lojasSelecionadas').setValue('');
    this.formGroup.get('dataInicial').setValue('');
    this.formGroup.get('dataFinal').setValue('');

  }

  gerarGrafico() {

    this.carregou = false;
    this.chartLabels = [];
    this.chartData = [{ data: [], label: [] }];

    let { periodoSelecionado, lojasSelecionadas, anosSelecionados, mesesSelecionados, diasSelecionados } = this.formGroup.controls;

    

    if (periodoSelecionado.value == 'Anual') {

      if (lojasSelecionadas.valid) {

        this.vendasService.findAll(lojasSelecionadas.value, anosSelecionados.value)
          .subscribe(response => {

            this.items = response;

            this.items.forEach(y => {

              this.chartData.forEach((dataset, index) => {
                this.chartData[index] = Object.assign({}, this.chartData[index], {
                  data: [...this.chartData[index].data, parseFloat(y.total).toFixed(2)]


                });

              });

              this.chartLabels = [...this.chartLabels, y.nomeLoja + " / " + "Ano: " + y.anoVenda];
              this.carregou = true;
            });



          }, error => {

          });
      }
    } else if (periodoSelecionado.value == 'Mensal') {

      if (lojasSelecionadas.value !=='') {

        this.vendasService.findMonth(mesesSelecionados.value, anosSelecionados.value, lojasSelecionadas.value)
          .subscribe(response => {

            this.items = response;

            this.items.forEach(y => {

              this.chartData.forEach((dataset, index) => {
                this.chartData[index] = Object.assign({}, this.chartData[index], {
                  data: [...this.chartData[index].data, parseFloat(y.total).toFixed(2)]

                });

              });

              this.chartLabels = [...this.chartLabels, y.nomeLoja + " / " + "Mês: " + y.anoVenda];
              this.carregou = true;
            });



          }, error => {

          })
      }
    } else if (periodoSelecionado.value == 'Diário') {

      if (lojasSelecionadas.value !=='') {

        this.vendasService.findDay(anosSelecionados.value, mesesSelecionados.value, diasSelecionados.value, lojasSelecionadas.value)
          .subscribe(response => {

            this.items = response;

            this.items.forEach(y => {

              this.chartData.forEach((dataset, index) => {
                this.chartData[index] = Object.assign({}, this.chartData[index], {
                  data: [...this.chartData[index].data, parseFloat(y.total).toFixed(2)]

                });

              });

              this.chartLabels = [...this.chartLabels, y.nomeLoja + " / " + "Dia: " + y.anoVenda];

              this.carregou = true;
            });



          }, error => {

          });
      }
    }

  }



  ionViewDidLoad() {

    for (var i = 2012; i <= 2030; i++) {

      this.anos.add(i);

    }
    for (var j = 1; j <= 12; j++) {

      this.meses.add(j);

    }
    for (var k = 1; k <= 31; k++) {

      this.dias.add(k);

    }

    this.carregaGraficos();
  }

  carregaGraficos() {

    this.lojasService.findAll()
      .subscribe(response => {

        this.lojas = response;


      }, error => {

      });
  }

  public barChartOptions: ChartOptions = {
    responsive: true,

    legend: { display: false, },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    },
    animation: {
      onComplete: function () {
        var chartInstance = this.chart,
          ctx = chartInstance.ctx;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
            var data = dataset.data[index];
            if (data > 0) {
              ctx.fillText(data, bar._model.x, bar._model.y - 10);
            }
          });
        });
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 20,
        bottom: 20
      }
    }

  };



  public chartColors: any[] = [
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
      ]
    }];

} 