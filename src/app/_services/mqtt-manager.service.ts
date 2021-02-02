import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { Paho } from '../utils/mqtt';

import 'rxjs/Rx';
// declare var jQuery: any;
import * as moment from 'moment';
import  {environment} from '../../environments/environment';
@Injectable()
export class mqttManager {

  public messageData: any = [];
  public _refreshNeeded=new Subject<string>();
  public isRefresh$=this._refreshNeeded.asObservable();

  
  public _client: Paho.MQTT.Client;
  

  constructor(private router: Router) {
    const id=JSON.parse(localStorage.getItem('currentUser'));

    this._client = new Paho.MQTT.Client(environment.mqtturl, 'adminOrderUpdates');
   // this.connect();
  }

  getMessages() {
    let observable = new Observable(observer => {
      this._client.onMessageArrived = (message: any) => {
        observer.next(message);
      };
    })
    return observable;
  } 



      private onDisConnected(): void {
         this.connect();
        console.log("Reconnected");
      }
  

  connect() {
    this._client.connect({ 
      onSuccess: this.onConnected.bind(this),
      onFailure:this.onDisConnected.bind(this),
      userName : environment.mqttUserName,
      password : environment.mqttPassword,
      timeout: 15,
      keepAliveInterval: 15,
      cleanSession: false,
     });
  }
   onMessageArrived(message) {this.updateStringSubject(message.payloadString);}
  public updateStringSubject(message:any) {this._refreshNeeded.next(message);}
  private onConnected(): void {
    const cityId=JSON.parse(localStorage.getItem('cityId'));
    const franchiseId=JSON.parse(localStorage.getItem('franchiseId'));
    const index=0;
    const fromDate =0;
    const toDate=0;
      const storeId=JSON.parse(localStorage.getItem('storeId'));
      if (JSON.parse(localStorage.getItem('userType')) == "0") {
        this._client.subscribe("cityManager/" + JSON.parse(localStorage.getItem('cityId')) + "/" + JSON.parse(localStorage.getItem('managerId')), { qos: 0 });
      } else if (localStorage.getItem('userType') == '1') {
        this._client.subscribe("dispatcher/" + localStorage.getItem('cityId') + "/" + localStorage.getItem('franchiseId') + "/#", { qos: 0 });
      } else if (localStorage.getItem('userType') == '2') {
        this._client.subscribe("storeManager/" + localStorage.getItem('cityId') + "/" + localStorage.getItem('franchiseId') + "/" + localStorage.getItem('storeId')+"/"+localStorage.getItem('managerId') , { qos: 2 });
      }
    }
    
}


