import { Injectable } from '@angular/core';
import * as moment from "moment";
//gotta look for an alternative to momentjs in future projects but works for this project


@Injectable()
export class AuthService {

    constructor() {}
          
    setLocalStorage(responseObj) {

        // Adds the expiration time defined on the JWT to the current moment
        const expiresAt = moment().add(Number.parseInt(responseObj.expiresIn), 'days');

        localStorage.setItem('id_token', responseObj.token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }          

    logout() {
        //removing it from the local storage is to logout and maybe login with another username 
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        //Is a "second" before? "year", "month" etc. could also be used instead
        //In a javascript class so "this" is used, if the moment() is returned 
        //isLoggendin will return false, usage of the second parameter is important
        return moment().isBefore(this.getExpiration(), "second");
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        if (expiration) {
            const expiresAt = JSON.parse(expiration);
            return moment(expiresAt);
        } else {
            //gets "now"
            return moment();
        }
    }    
}