export interface UpdateAccount {
    oldEmail?: string;
    email?: string;
    password?: string;
    idUsuario?: string;
    nombre?: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    calle?: string;
    numeroExterior?: string;
    numeroInterior?: string;
    colonia?: string;
    municipio?: string;
    codigoPostal?: string;
    telefonoFijo?: string;
    telefonoCelular?: string;
    idRol?: number;
}
