import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment'
import 'rxjs/add/operator/map'
import { Subject } from 'rxjs';
// import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private REST_API_SERVER = environment.apiUrl;
  private _subject =new Subject<any>();
  Orderstatus: string;
  sortedActivity: any[];
  orderActivity: any;
  constructor(private http: HttpClient) { }

public setStatus(order){
  this.sortedActivity = [];
  this.orderActivity=order['timeStamp'];
    for (var key in this.orderActivity) {
      if(key=="completed"){
        console.log("completed000");
        this.sortedActivity.push({key:"delivered",value:this.orderActivity[key]})
      }else{
      this.sortedActivity.push({key:key,value:this.orderActivity[key]})}
      }
        this.sortedActivity.sort(function(a, b) {
        return a.value.timeStamp - b.value.timeStamp;
    });
  console.log(this.sortedActivity);
}
  public getStatus(){
    return this.sortedActivity;
  }
  public cancelOrder(orderId,timestamp,comment){
    const body = {"status":31, 'orderId':orderId,"timestamp":timestamp,'comment':comment};
    return this.http.post(this.REST_API_SERVER+'/franchise/order/update',body).map(data=>
     data);
  }
  public updateOrder(orderId,timestamp,comment,payment){
    const body = {"status":32, 'orderId':orderId,"timestamp":timestamp,'comment':comment,"paymentType":payment};
    return this.http.post(this.REST_API_SERVER+'/franchise/order/update',body).map(data=>
     data);
  }
  public commentOrder(orderId,timestamp,comment,orderStatus){
    const body = {"status":33, 'orderId':orderId,"timestamp":timestamp,'comment':comment,"orderStatus":orderStatus};
    return this.http.post(this.REST_API_SERVER+'/franchise/order/update',body).map(data=>
     data);
  }

newEvent(event){
  this._subject.next(event);
}
get events$ (){
  return this._subject.asObservable();
}
}
