import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';


@Injectable()
export class AccessProviders {
  // url backend api json
  server: string = 'https://localhost/api/proses_api.php';
  val: string;
  transitVal: string;
  itemVal: string;
  examName: string;
  datasIndex: number;
  struct: [];
  datasTypConsult: [];
  constructor(
    private platform: Platform,
    public http: HttpClient,

  ) { }

  // envoi des données vers l'API
  postData(body) {
    let headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8'
    });
    let options = {
      headers : headers
    }
    return this.http.post(this.server, JSON.stringify(body), options)
      .timeout(60000) // 60 sec timeout
    .map(res => res)
  }

  contData(datas) {
    this.val = datas;
  return this.val
  }

  //Cette fonction renvoie le nom de l'examen comme titre sur la page laboratoire
  contDataExam(datas) {
    this.itemVal = datas;
  return this.itemVal
  }

  //Cette fonction renvoie les données sur les details de la structure dans le cas du type de consultation choisie
  DataDetailsTypConsultation(datasTypConsult) {
    this.datasTypConsult = datasTypConsult;
  return this.datasTypConsult
  }

  //Cette fonction renvoie l'index de la structure choisi 
  DataIndex(dataindex) {
    this.datasIndex = dataindex;
  return this.datasIndex
  }

  contDataExamName(vals) {
    this.examName = vals;
  return this.examName
  }

  contStructures(param){
    this.struct = param
    return this.struct
  }
  
  transitFunction(val) {
    this.transitVal = val;
  return this.transitVal
  }


}
