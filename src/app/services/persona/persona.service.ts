import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private urlApi = 'http://localhost:8080/persona/';

  constructor( private httpClient: HttpClient) { }

  public getAllPersonas(): Observable<any>{

    return this.httpClient.get(this.urlApi);
  }
 
  public savePersona(persona : any) : Observable<any>{
    return this.httpClient.post(this.urlApi,persona);
  } 

  public deletePersona(id : any):Observable<any>{
    return this.httpClient.delete(this.urlApi+ "delete/"+id)
  }

}
