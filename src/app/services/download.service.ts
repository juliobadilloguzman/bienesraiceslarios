import { Injectable } from '@angular/core';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import * as moment from 'moment';

import { HttpClient } from '@angular/common/http';
import { Mensualidad } from '../models/mensualidad';
import { Terreno } from '../models/terreno';
import { UsuariosService } from './usuarios.service';
import { Usuario } from '../models/usuario';
import { CurrencyPipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  logoData = null;
  pdfObj = null;
  userNamelogged: string;

  constructor(
    private http: HttpClient,
    private _usersService: UsuariosService,
    private currencyPipe: CurrencyPipe,
  ) {
    this.loadLocalAssetToBase64();
    this.getUserNameLogged();
  }

  loadLocalAssetToBase64(): void {
    this.http.get('/assets/img/logos/logo.png', { responseType: 'blob' }).subscribe((response: any) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.logoData = reader.result;
      };
      reader.readAsDataURL(response);
    });
  }

  async getUserNameLogged() {

    const userLogged = JSON.parse(localStorage.getItem('authData'));

    if(userLogged){

      const user = await this._usersService.getUsuarioP(userLogged['idUsuario']);
      this.userNamelogged = `${user.nombre} ${user.apellidoPaterno}`;

    }
  
  }

  generateCostoTotalCotizacion(content: any[], planPago: any){

    let costoTotal = 0;

    for(let terreno of content){

      if(planPago.plan == 'contado'){
        costoTotal += ((terreno.metros*terreno.costoM2)-((terreno.metros*terreno.costoM2)*.10));
      }else{
        costoTotal += (terreno.metros*terreno.costoM2);
      }

    }

    return costoTotal;

  }

  generateMensualidades(content: Mensualidad[]) {

    const generatedMensualidades: any = [
      [
        {
          text: '# Mensualidad',
          fillColor: '#1e2642',
          fontSize: 9,
          color: '#ffffff',
          border: [false, false, false, false],
          margin: [0, 5, 0, 5],
        },
        {
          text: 'Fecha de Pago',
          border: [false, false, false, false],
          alignment: 'right',
          fillColor: '#1e2642',
          fontSize: 9,
          color: '#ffffff',
          margin: [0, 5, 0, 5],
          textTransform: 'uppercase',
        },
        {
          text: 'Mes',
          border: [false, false, false, false],
          alignment: 'right',
          fillColor: '#1e2642',
          fontSize: 9,
          color: '#ffffff',
          margin: [0, 5, 0, 5],
          textTransform: 'uppercase',
        },
        {
          text: 'Interés',
          border: [false, false, false, false],
          alignment: 'right',
          fillColor: '#1e2642',
          fontSize: 9,
          color: '#ffffff',
          margin: [0, 5, 0, 5],
          textTransform: 'uppercase',
        },
        {
          text: 'Monto (MXN)',
          fontSize: 9,
          border: [false, false, false, false],
          alignment: 'right',
          fillColor: '#1e2642',
          color: '#ffffff',
          margin: [0, 5, 0, 5],
          textTransform: 'uppercase',
        }
      ]
    ];

    content.forEach((mensualidad) => {
      let requestMensualidades = [
        {
          text: mensualidad.numeroMensualidad,
          fontSize: 9,
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
          alignment: 'left',
        },
        {
          border: [false, false, false, true],
          fontSize: 9,
          text: (mensualidad.estatusPago == 'NO PAGADA') ? 'No pagada aún' : moment(mensualidad.fechaPago).format("DD-MM-YYYY"),
          bold: (mensualidad.estatusPago == 'NO PAGADA') ? true : false,
          fillColor: (mensualidad.estatusPago == 'NO PAGADA') ? '#ff8383' : '#f5f5f5',
          alignment: 'right',
          margin: [0, 5, 0, 5],
        },
        {
          border: [false, false, false, true],
          fontSize: 9,
          text: mensualidad.mes,
          fillColor: '#f5f5f5',
          alignment: 'right',
          margin: [0, 5, 0, 5],
        },
        {
          border: [false, false, false, true],
          fontSize: 9,
          text: this.getInteres(mensualidad),
          color: this.getColorInteres(mensualidad),
          bold: true,
          fillColor: '#f5f5f5',
          alignment: 'right',
          margin: [0, 5, 0, 5],
        },
        {
          border: [false, false, false, true],
          fontSize: 9,
          text: `MXN ${this.currencyPipe.transform(mensualidad.monto)}`,
          fillColor: (mensualidad.estatusPago == 'NO PAGADA') ? '#ff8383' : '#80d26d',
          alignment: 'right',
          margin: [0, 5, 0, 5],
        },
      ];

      generatedMensualidades.push(requestMensualidades);

    });

    return generatedMensualidades;
  }

  generateCotizacionTerrenos(content: any[], planPago: any) {

    const generateTerrenos: any = [
      [
        {
          text: 'Numero de Terreno',
          fillColor: '#1e2642',
          fontSize: 9,
          color: '#ffffff',
          border: [false, false, false, false],
          margin: [0, 5, 0, 5],
        },
        {
          text: 'Numero de Manzana',
          border: [false, false, false, false],
          alignment: 'right',
          fillColor: '#1e2642',
          fontSize: 9,
          color: '#ffffff',
          margin: [0, 5, 0, 5],
          textTransform: 'uppercase',
        },
        {
          text: 'Medida',
          border: [false, false, false, false],
          alignment: 'right',
          fillColor: '#1e2642',
          fontSize: 9,
          color: '#ffffff',
          margin: [0, 5, 0, 5],
          textTransform: 'uppercase',
        },
        {
          text: 'Costo x m2',
          border: [false, false, false, false],
          alignment: 'right',
          fillColor: '#1e2642',
          fontSize: 9,
          color: '#ffffff',
          margin: [0, 5, 0, 5],
          textTransform: 'uppercase',
        },
        {
          text: 'Costo Total',
          fontSize: 9,
          border: [false, false, false, false],
          alignment: 'right',
          fillColor: '#1e2642',
          color: '#ffffff',
          margin: [0, 5, 0, 5],
          textTransform: 'uppercase',
        }
      ]
    ];

    content.forEach((terreno) => {
      let requestTerrenos = [
        {
          text: `${terreno.noTerreno}`,
          fontSize: 9,
          border: [false, false, false, true],
          margin: [0, 5, 0, 5],
          alignment: 'left',
        },
        {
          border: [false, false, false, true],
          fontSize: 9,
          text: `${terreno.manzana}`,
          fillColor: '#f5f5f5',
          alignment: 'right',
          margin: [0, 5, 0, 5],
        },
        {
          border: [false, false, false, true],
          fontSize: 9,
          text: `${terreno.metros}m2`,
          bold: true,
          fillColor: '#f5f5f5',
          alignment: 'right',
          margin: [0, 5, 0, 5],
        },
        {
          border: [false, false, false, true],
          fontSize: 9,
          text: (planPago.plan == 'financiamiento') ? `${this.currencyPipe.transform(terreno.costoM2)}` : `${this.currencyPipe.transform(terreno.costoM2-(terreno.costoM2*.10))}`,
          fillColor: '#f5f5f5',
          alignment: 'right',
          margin: [0, 5, 0, 5],
        },
        {
          border: [false, false, false, true],
          fontSize: 9,
          text: (planPago.plan == 'contado') ? `MXN ${this.currencyPipe.transform((terreno.metros*terreno.costoM2)-((terreno.metros*terreno.costoM2)*.10))}` : `MXN ${this.currencyPipe.transform((terreno.metros*terreno.costoM2))}`,
          fillColor: '#80d26d',
          alignment: 'right',
          margin: [0, 5, 0, 5],
        },
      ];

      generateTerrenos.push(requestTerrenos);

    });

    return generateTerrenos;
  }

  getColorInteres(mensualidad: Mensualidad): string {
    if (mensualidad.estatusInteres == null) {
      return '#33891c';
    } else if (mensualidad.estatusInteres == 'PAGADO') {
      return '#33891c';
    } else if (mensualidad.estatusInteres == "NO PAGADO") {
      return '#dc3545';
    }
  }

  getInteres(mensualidad: Mensualidad) {

    if (mensualidad.interes == null) {
      return this.currencyPipe.transform(0);
    } else {
      if (mensualidad.estatusInteres == 'PAGADO') {
        return `${this.currencyPipe.transform(mensualidad.interes)}`
      } else if (mensualidad.estatusInteres == 'NO PAGADO') {
        return `${this.currencyPipe.transform(mensualidad.interes)}`
      }
    }

  }

  getTotalPagadoMensualidades(mensualidades: Mensualidad[]): number {

    let total: number = 0;

    for (const mensualidad of mensualidades) {
      if (mensualidad.estatusPago == 'PAGADA') {
        total += mensualidad.monto;
      }
    }

    return total;

  }

  getTotalIntereses(mensualidades: Mensualidad[]): number {

    let total: number = 0;

    for (const mensualidad of mensualidades) {
      if (mensualidad.interes != null && mensualidad.estatusInteres == 'NO PAGADO') {
        total += mensualidad.interes;
      }
    }

    console.log(total);

    return total;

  }

  generateEstadoCuentaPdf(content: Mensualidad[], terreno?: Terreno): void {

    const userLogged = JSON.parse(localStorage.getItem('authData'));

    const documentDefinition = {
      content: [
        {
          columns: [
            {
              image: this.logoData,
              width: 150,
            },
            [
              {
                text: 'Estado de cuenta',
                color: '#1e2642',
                width: '*',
                fontSize: 18,
                bold: true,
                alignment: 'right',
                margin: [0, 0, 0, 2],
              },
              {
                stack: [
                  {
                    columns: [
                      {
                        text: '',
                        color: '#aaaaab',
                        bold: true,
                        width: '*',
                        fontSize: 10,
                        alignment: 'right',
                      },
                      {
                        text: `${terreno.usuario.nombre} ${(terreno.usuario.apellidoPaterno == null) ? '' : terreno.usuario.apellidoPaterno} ${(terreno.usuario.apellidoMaterno == null) ? '' : terreno.usuario.apellidoMaterno}`,
                        bold: true,
                        color: '#555555',
                        width: '*',
                        fontSize: 12,
                        alignment: 'right',
                        margin: [0, 0, 0, 2],
                      },
                    ],
                  },
                  '\n',
                  {
                    columns: [
                      {
                        text: `Manzana: ${terreno.noManzana}`,
                        color: '#1e2642',
                        width: '*',
                        fontSize: 10,
                        bold: true,
                        alignment: 'right',
                        margin: [0, 0, 0, 3]
                      }
                    ],
                  },
                  {
                    columns: [
                      {
                        text: '',
                        color: '#aaaaab',
                        bold: true,
                        width: '*',
                        fontSize: 10,
                        alignment: 'right',
                        margin: [0, 0, 0, 3]
                      },
                      {
                        text: `Lote: ${terreno.noLote}`,
                        bold: true,
                        color: '#333333',
                        fontSize: 10,
                        alignment: 'right',
                        width: '*',
                        margin: [0, 0, 0, 3]
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: '',
                        color: '#aaaaab',
                        bold: true,
                        fontSize: 10,
                        alignment: 'right',
                        width: '*',
                      },
                      {
                        text: `Fraccionamiento ${terreno.fraccionamiento.nombre}`,
                        bold: true,
                        fontSize: 10,
                        alignment: 'right',
                        color: 'green',
                        width: '*',
                      },
                    ],
                  },
                ],
              },
            ],
          ],
        },
        {
          columns: [
            {
              text: 'Estado de cuenta generado por:',
              color: '#1e2642',
              bold: true,
              fontSize: 9,
              alignment: 'left',
              margin: [0, 30, 0, 3],
            },
            {
              text: 'Fecha de generación:',
              color: '#1e2642',
              bold: true,
              fontSize: 9,
              alignment: 'left',
              margin: [0, 30, 0, 3],
            },
            {
              text: '',
              color: '#1e2642',
              bold: true,
              fontSize: 9,
              alignment: 'left',
              margin: [0, 20, 0, 3],
            },
          ],
        },
        {
          columns: [
            {
              text: `${this.userNamelogged} \n ${userLogged.email}`,
              bold: false,
              fontSize: 9,
              color: '#333333',
              alignment: 'left',
            },
            {
              text: moment().locale('es').format('LLLL'),
              bold: false,
              fontSize: 9,
              color: '#333333',
              alignment: 'left',
            },
            {
              text: '',
              bold: false,
              fontSize: 9,
              color: '#333333',
              alignment: 'left',
            },
          ],
        },
        // {
        //   columns: [
        //     {
        //       text: 'Enviado el',
        //       color: '#1e2642',
        //       bold: true,
        //       fontSize: 9,
        //       margin: [0, 10, 0, 3],
        //     },
        //     {
        //       text: 'Periodo del informe',
        //       color: '#1e2642',
        //       bold: true,
        //       fontSize: 9,
        //       margin: [0, 10, 0, 3],
        //     },
        //     {
        //       text: '',
        //       color: '#1e2642',
        //       bold: true,
        //       fontSize: 9,
        //       margin: [0, 10, 0, 3],
        //     },
        //   ],
        // },
        // {
        //   columns: [
        //     {
        //       text: `TEMPORAL`,
        //       bold: false,
        //       fontSize: 9,
        //       color: '#333333',
        //     },
        //     {
        //       text: 'TEMPORAL',
        //       bold: false,
        //       fontSize: 9,
        //       color: '#333333',
        //     },
        //     {
        //       text: '',
        //       bold: false,
        //       fontSize: 9,
        //       color: '#333333',
        //     },
        //   ],
        // },
        '\n\n',
        {
          width: '100%',
          alignment: 'center',
          text: 'Pagos hasta la fecha',
          bold: true,
          margin: [0, 10, 0, 10],
          fontSize: 12,
        },
        // {
        //   text: ['TEMPORAL'],
        //   alignment: 'left',
        //   fontSize: 9,
        //   margin: [0, 5, 0, 20]
        // },
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function (i, node) {
              return 1;
            },
            vLineWidth: function (i, node) {
              return 1;
            },
            hLineColor: function (i, node) {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
              return '#eaeaea';
            },
            vLineColor: function (i, node) {
              return '#eaeaea';
            },
            hLineStyle: function (i, node) {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: function (i, node) {
              return 5;
            },
            paddingRight: function (i, node) {
              return 5;
            },
            paddingTop: function (i, node) {
              return 2;
            },
            paddingBottom: function (i, node) {
              return 2;
            },
            fillColor: function (rowIndex, node, columnIndex) {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: [80, 90, 90, 100, 100],
            body: this.generateMensualidades(content),
          },
        },
        {
          columns: [
            {
              width: '100%',
              alignment: 'center',
              text: (terreno.saldo == 0) ? 'El terreno ha sido liquidado' : '',
              bold: true,
              margin: [0, 10, 0, 10],
              fontSize: 12,
            }
          ]
        },
        '\n',
        '\n\n',
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function (i, node) {
              return 1;
            },
            vLineWidth: function (i, node) {
              return 1;
            },
            hLineColor: function (i, node) {
              return '#eaeaea';
            },
            vLineColor: function (i, node) {
              return '#eaeaea';
            },
            hLineStyle: function (i, node) {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: function (i, node) {
              return 10;
            },
            paddingRight: function (i, node) {
              return 10;
            },
            paddingTop: function (i, node) {
              return 3;
            },
            paddingBottom: function (i, node) {
              return 3;
            },
            fillColor: function (rowIndex, node, columnIndex) {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['*', 'auto'],
            body: [
              [
                {
                  text: 'Costo total del terreno',
                  border: [false, false, false, true],
                  alignment: 'right',
                  fontSize: 9,
                  margin: [0, 3, 0, 5],
                },
                {
                  text: `${this.currencyPipe.transform(terreno.costoTotal)}`,
                  border: [false, false, false, true],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  fontSize: 9,
                  margin: [0, 3, 0, 5],
                },
              ],
              [
                {
                  text: 'Enganche pagado',
                  border: [false, false, false, true],
                  alignment: 'right',
                  fontSize: 9,
                  margin: [0, 3, 0, 5],
                },
                {
                  text: (!terreno.enganche) ? 'N/A' : `${this.currencyPipe.transform(terreno.enganche)}`,
                  border: [false, false, false, true],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  fontSize: 9,
                  margin: [0, 3, 0, 5],
                },
              ],
              [
                {
                  text: 'Total pagado hasta la fecha',
                  border: [false, true, false, true],
                  fontSize: 9,
                  alignment: 'right',
                  margin: [0, 3, 0, 5],
                },
                {
                  border: [false, true, false, true],
                  text: `${this.currencyPipe.transform(this.getTotalPagadoMensualidades(content))}`,
                  //text: 'PRUEBABRO',
                  alignment: 'right',
                  fontSize: 9,
                  fillColor: '#f5f5f5',
                  margin: [0, 3, 0, 0],
                },
              ],
              [
                {
                  text: 'Intereses por pagar',
                  border: [false, true, false, true],
                  fontSize: 9,
                  alignment: 'right',
                  margin: [0, 3, 0, 5],
                },
                {
                  border: [false, true, false, true],
                  text: `${this.currencyPipe.transform(this.getTotalIntereses(content))}`,
                  //text: 'PRUEBA BRO',
                  alignment: 'right',
                  color: '#ffffff',
                  fontSize: 9,
                  fillColor: (this.getTotalIntereses(content) > 0) ? '#a50000' : 'green',
                  margin: [0, 3, 0, 0],
                },
              ],
              [
                {
                  text: 'Saldo total sin intereses',
                  border: [false, true, false, true],
                  fontSize: 9,
                  alignment: 'right',
                  margin: [0, 3, 0, 5],
                },
                {
                  border: [false, true, false, true],
                  //text: 'PRUEBA BRO',
                  text: `${this.currencyPipe.transform(terreno.saldo - this.getTotalIntereses(content))}`,
                  alignment: 'right',
                  fontSize: 9,
                  fillColor: '#f5f5f5',
                  margin: [0, 3, 0, 0],
                },
              ],
              [
                {
                  text: 'Saldo total a pagar hasta la fecha',
                  bold: true,
                  alignment: 'right',
                  fontSize: 9,
                  border: [false, false, false, true],
                  margin: [0, 3, 0, 5],
                },
                {
                  text: `${this.currencyPipe.transform(terreno.saldo)}`,
                  bold: true,
                  alignment: 'right',
                  fontSize: 9,
                  border: [false, false, false, true],
                  fillColor: '#f5f5f5',
                  margin: [0, 3, 0, 5],
                },
              ],
            ],
          },
        },
        '\n\n',
        /*{
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [180],
            body: [
              [{ text: '', border: [false, false, false, true], margin: [0, 0, 0, 15] }],
              [{ text: '', border: [false, false, false, false] }]
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return 0.50;
            },
            vLineWidth: function (i, node) {
              return 0.50;
            }
          }
        },*/
        /*{
          columns: [
            {
              text: 'Enviado por',
              color: '#1e2642',
              bold: true,
              fontSize: 9,
              border: [true, false, false, true],
              alignment: 'left',
              margin: [0, 0, 0, 3],
            },
            {
              text: '',
              color: '#1e2642',
              bold: true,
              fontSize: 9,
              alignment: 'left',
              margin: [0, 0, 0, 3],
            },
            {
              text: '',
              color: '#1e2642',
              bold: true,
              fontSize: 9,
              alignment: 'left',
              margin: [0, 0, 0, 3],
            },
          ],
        }*/

      ],
      styles: {
        notesTitle: {
          fontSize: 10,
          bold: true,
          margin: [0, 50, 0, 3],
        },
        notesText: {
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 20,
      },
    };

    this.pdfObj = pdfMake.createPdf(documentDefinition);
    this.openPdf();

  }

  generateCotizacion(content: any[], planPago: any): void {

    const userLogged = JSON.parse(localStorage.getItem('authData'));

    const documentDefinition = {
      content: [
        {
          columns: [
            {
              image: this.logoData,
              width: 150,
            },
            [
              {
                text: 'Cotización',
                color: '#1e2642',
                width: '*',
                fontSize: 18,
                bold: true,
                alignment: 'right',
                margin: [0, 0, 0, 2],
              },
              {
                stack: [
                  {
                    columns: [
                      {
                        text: '',
                        color: '#aaaaab',
                        bold: true,
                        width: '*',
                        fontSize: 10,
                        alignment: 'right',
                      },
                      {
                        text: `Fraccionamiento Residencial Campestre`,
                        bold: true,
                        color: 'green',
                        width: '*',
                        fontSize: 10,
                        alignment: 'right',
                        margin: [0, 0, 0, 2],
                      },
                    ],
                  },
                  '\n'
                ],
              },
            ],
          ],
        },
        {
          columns: [
            {
              text: 'Cotización generada por:',
              color: '#1e2642',
              bold: true,
              fontSize: 9,
              alignment: 'left',
              margin: [0, 30, 0, 3],
            },
            {
              text: 'Fecha de generación:',
              color: '#1e2642',
              bold: true,
              fontSize: 9,
              alignment: 'left',
              margin: [0, 30, 0, 3],
            },
            {
              text: '',
              color: '#1e2642',
              bold: true,
              fontSize: 9,
              alignment: 'left',
              margin: [0, 20, 0, 3],
            },
          ],
        },
        {
          columns: [
            {
              text: (userLogged) ? `${this.userNamelogged} \n ${userLogged.email}` : 'Usuario no registrado',
              bold: false,
              fontSize: 9,
              color: '#333333',
              alignment: 'left',
            },
            {
              text: moment().locale('es').format('LLLL'),
              bold: false,
              fontSize: 9,
              color: '#333333',
              alignment: 'left',
            },
            {
              text: '',
              bold: false,
              fontSize: 9,
              color: '#333333',
              alignment: 'left',
            },
          ],
        },
        // {
        //   columns: [
        //     {
        //       text: 'Enviado el',
        //       color: '#1e2642',
        //       bold: true,
        //       fontSize: 9,
        //       margin: [0, 10, 0, 3],
        //     },
        //     {
        //       text: 'Periodo del informe',
        //       color: '#1e2642',
        //       bold: true,
        //       fontSize: 9,
        //       margin: [0, 10, 0, 3],
        //     },
        //     {
        //       text: '',
        //       color: '#1e2642',
        //       bold: true,
        //       fontSize: 9,
        //       margin: [0, 10, 0, 3],
        //     },
        //   ],
        // },
        // {
        //   columns: [
        //     {
        //       text: `TEMPORAL`,
        //       bold: false,
        //       fontSize: 9,
        //       color: '#333333',
        //     },
        //     {
        //       text: 'TEMPORAL',
        //       bold: false,
        //       fontSize: 9,
        //       color: '#333333',
        //     },
        //     {
        //       text: '',
        //       bold: false,
        //       fontSize: 9,
        //       color: '#333333',
        //     },
        //   ],
        // },
        '\n\n',
        {
          width: '100%',
          alignment: 'center',
          text: (planPago.plan == 'contado') ? 'Plan al contado' : `Plan financiamiento a ${planPago.numeroMensualidades} mensualidades`,
          bold: true,
          margin: [0, 10, 0, 10],
          fontSize: 12,
        },
        // {
        //   text: ['TEMPORAL'],
        //   alignment: 'left',
        //   fontSize: 9,
        //   margin: [0, 5, 0, 20]
        // },
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function (i, node) {
              return 1;
            },
            vLineWidth: function (i, node) {
              return 1;
            },
            hLineColor: function (i, node) {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
              return '#eaeaea';
            },
            vLineColor: function (i, node) {
              return '#eaeaea';
            },
            hLineStyle: function (i, node) {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: function (i, node) {
              return 5;
            },
            paddingRight: function (i, node) {
              return 5;
            },
            paddingTop: function (i, node) {
              return 2;
            },
            paddingBottom: function (i, node) {
              return 2;
            },
            fillColor: function (rowIndex, node, columnIndex) {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: [80, 90, 90, 100, 100],
            body: this.generateCotizacionTerrenos(content, planPago),
          },
        },
        '\n',
        '\n\n',
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function (i, node) {
              return 1;
            },
            vLineWidth: function (i, node) {
              return 1;
            },
            hLineColor: function (i, node) {
              return '#eaeaea';
            },
            vLineColor: function (i, node) {
              return '#eaeaea';
            },
            hLineStyle: function (i, node) {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: function (i, node) {
              return 10;
            },
            paddingRight: function (i, node) {
              return 10;
            },
            paddingTop: function (i, node) {
              return 3;
            },
            paddingBottom: function (i, node) {
              return 3;
            },
            fillColor: function (rowIndex, node, columnIndex) {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['*', 'auto'],
            body: [
              [
                {
                  text: (planPago.plan == 'contado') ? 'Total a pagar en una sola exhibicación' : 'Total a pagar',
                  bold: true,
                  alignment: 'right',
                  fontSize: 9,
                  border: [false, false, false, true],
                  margin: [0, 3, 0, 5],
                },
                {
                  text: `${this.currencyPipe.transform(this.generateCostoTotalCotizacion(content, planPago))}`,
                  bold: true,
                  alignment: 'right',
                  fontSize: 9,
                  border: [false, false, false, true],
                  fillColor: '#f5f5f5',
                  margin: [0, 3, 0, 5],
                },
              ],
              [

                (planPago.plan == 'financiamiento') ?  
                  {
                    text: `Enganche del 10%`,
                    border: [false, false, false, true],
                    alignment: 'right',
                    fontSize: 9,
                    margin: [0, 3, 0, 5],
                  }
                :
                  ''
                ,

                (planPago.plan == 'financiamiento') ? 
                  {
                    text: `${this.currencyPipe.transform(this.generateCostoTotalCotizacion(content, planPago)*0.10)}`,
                    border: [false, false, false, true],
                    fillColor: '#f5f5f5',
                    alignment: 'right',
                    fontSize: 9,
                    margin: [0, 3, 0, 5],
                  }
                :
                  '',
              ],
              [

                (planPago.plan == 'financiamiento') ? 
                  {
                    text: `${planPago.numeroMensualidades} mensualidades de`,
                    border: [false, true, false, true],
                    fontSize: 9,
                    alignment: 'right',
                    margin: [0, 3, 0, 5],
                  }
                :
                  '',

                (planPago.plan == 'financiamiento') ? 
                  {
                    border: [false, true, false, true],
                    text: `${this.currencyPipe.transform((this.generateCostoTotalCotizacion(content, planPago)-(this.generateCostoTotalCotizacion(content, planPago)*.10))/planPago.numeroMensualidades)}`,
                    //text: 'PRUEBABRO',
                    alignment: 'right',
                    fontSize: 9,
                    fillColor: '#f5f5f5',
                    margin: [0, 3, 0, 0],
                  }
                :
                  '',
              ],            
            ],
          },
        },
        '\n\n',
        /*{
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [180],
            body: [
              [{ text: '', border: [false, false, false, true], margin: [0, 0, 0, 15] }],
              [{ text: '', border: [false, false, false, false] }]
            ]
          },
          layout: {
            hLineWidth: function (i, node) {
              return 0.50;
            },
            vLineWidth: function (i, node) {
              return 0.50;
            }
          }
        },*/
        /*{
          columns: [
            {
              text: 'Enviado por',
              color: '#1e2642',
              bold: true,
              fontSize: 9,
              border: [true, false, false, true],
              alignment: 'left',
              margin: [0, 0, 0, 3],
            },
            {
              text: '',
              color: '#1e2642',
              bold: true,
              fontSize: 9,
              alignment: 'left',
              margin: [0, 0, 0, 3],
            },
            {
              text: '',
              color: '#1e2642',
              bold: true,
              fontSize: 9,
              alignment: 'left',
              margin: [0, 0, 0, 3],
            },
          ],
        }*/

      ],
      styles: {
        notesTitle: {
          fontSize: 10,
          bold: true,
          margin: [0, 50, 0, 3],
        },
        notesText: {
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 20,
      },
    };

    this.pdfObj = pdfMake.createPdf(documentDefinition);
    this.openPdf();
    this.downloadPdf();

  }


  openPdf(): void {
    this.pdfObj.open();
  }

  downloadPdf(): void {
    this.pdfObj.download();
  }

  printPdf(): void {
    this.pdfObj.print();
  }


}
