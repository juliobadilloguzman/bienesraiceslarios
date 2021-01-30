export interface Terreno {
    idTerreno: number;
    noManzana: number
    noLote: number;
    superficie: number;
    costoM2: number;
    enganche?: number;
    formaPagoEnganche?: string;
    pagoAlContado?: number;
    costoTotal: number;
    saldo: number;
    fechaVenta: string;
    noMensualidades?: number;
    montoMensualidad?: number;
    diaPagoDel?: number;
    diaPagoAl?: number;
    pagoDeslinde: number;
    fechaPagoDeslinde?: number;
    montoDeslinde?: number;
    fechaPrimeraMensualidad?: string;
    comentariosAdicionales?: string;
    estatus: string;
    fraccionamiento: any;
    usuario: any;
    vendedores: any[];
}
