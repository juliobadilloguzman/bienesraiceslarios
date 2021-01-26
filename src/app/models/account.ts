import { Rol } from './rol';

export class Account {

    constructor(public idCuenta: number, public idUsuario: number, public email: string, private _token: string, private _tokenExpirationDate: Date, public roles: Rol[]) { }

    get token() {

        if (!this._tokenExpirationDate || this._tokenExpirationDate <= new Date())
            return null;

        return this._token;
    }

    get tokenDuration() {
        if (!this.token) {
            return 0;
        }
        return this._tokenExpirationDate.getTime() - new Date().getTime();
    }

}
