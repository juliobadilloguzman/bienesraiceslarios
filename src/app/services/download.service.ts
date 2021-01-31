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

  getUserNameLogged() {
    const userLogged = JSON.parse(localStorage.getItem('authData'));
    this._usersService.getUsuario(userLogged['idUsuario']).subscribe(
      (response: Usuario) => {
        this.userNamelogged = `${response.nombre} ${response.apellidoPaterno}`;
      },
      (error) => { }
    );
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
          text: (mensualidad.fechaPago == null) ? 'No pagada aún' : mensualidad.fechaPago,
          bold: (mensualidad.fechaPago == null) ? true : false,
          fillColor: (mensualidad.fechaPago == null) ? '#ff8383' : '#f5f5f5',
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

  getColorInteres(mensualidad: Mensualidad): string {
    if (mensualidad.estatusInteres == null) {
      return '#000000';
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

  generateEstadoCuentaPdf(content: Mensualidad[]): void {

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
                        text: `${content[0].terreno.usuario.nombre} ${(content[0].terreno.usuario.apellidoPaterno == null) ? '' : content[0].terreno.usuario.apellidoPaterno} ${(content[0].terreno.usuario.apellidoMaterno == null) ? '' : content[0].terreno.usuario.apellidoMaterno}`,
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
                        text: `Manzana: ${content[0].terreno.noManzana}`,
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
                        text: `Lote: ${content[0].terreno.noLote}`,
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
                        text: `Fraccionamiento ${content[0].terreno.fraccionamiento.nombre}`,
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
          text: 'Mensualidades hasta hasta la fecha',
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
                  text: `${this.currencyPipe.transform(content[0].terreno.costoTotal)}`,
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
                  text: `${this.currencyPipe.transform(content[0].terreno.enganche)}`,
                  border: [false, false, false, true],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  fontSize: 9,
                  margin: [0, 3, 0, 5],
                },
              ],
              [
                {
                  text: 'Total pagado de mensualidades',
                  border: [false, true, false, true],
                  fontSize: 9,
                  alignment: 'right',
                  margin: [0, 3, 0, 5],
                },
                {
                  border: [false, true, false, true],
                  text: `${this.currencyPipe.transform(this.getTotalPagadoMensualidades(content))}`,
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
                  text: `${this.currencyPipe.transform(content[0].terreno.saldo)}`,
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
                  text: `${this.currencyPipe.transform(content[0].terreno.saldo + this.getTotalIntereses(content))}`,
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
    console.log(this.pdfObj)
    this.openPdf();

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
