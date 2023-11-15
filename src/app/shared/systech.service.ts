import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SystechService {
  headers: HttpHeaders | undefined;

  constructor(private _http: HttpClient) { }
   // http methods
   get(url: string) {
    // get data from local json file
    return this._http.get(environment.API_URL + url);
  }
  post(url: string, data: any) {
    url = environment.API_URL + url ; // url storage via environment no production
    this.headers = new HttpHeaders();
    return this._http.post(url, data, {headers: this.headers} );
  }
  put(url: string, data: any) {
    url = environment.API_URL + url;
    return this._http.put(url , data, {headers: this.headers}); /*headers for send data to server with json or xml */
  }
  delete(url: string   ) {
    url = environment.API_URL + url;
    return this._http.delete(url , {headers: this.headers});
  }
}
