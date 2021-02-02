import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'
import { map, catchError } from 'rxjs/operators';
import {AuthenticationService} from '../_services/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private REST_API_SERVER = environment.apiUrl+'/orders';
  OrderData:{};
  newOrder:{};
  acceptedOrder:{};
  assignedOrder:{};
  completedOrder:{};
  reachedAtStoreOrder:{};
  inDispatchOrder:{};
  inProgress:{};
  packageOrder:{};
  pickUpReadyOrder:{};
  pickedUpOrder:{};
  rejectedOrder:{};
  cancelledOrder:{};
  reachedCustomerOrder:{};
  tabsCount:[];


  constructor(private httpClient: HttpClient,private auth:AuthenticationService) {

  }


  public getOrderData(){
    //console.log("getOrderData");
    // const headers={'authorization':JSON.parse(localStorage.getItem('authToken')),'language':'en'};
    const cityId=JSON.parse(localStorage.getItem('cityId'));
    const index=0;
    const franchiseId=JSON.parse(localStorage.getItem('franchiseId'));
    const storeId=JSON.parse(localStorage.getItem('storeId'));
  
    const fromDate =0;
    const toDate=0;
      return this.httpClient.get(
        // 'http://app5.labaiik.com/api/orders/null/0/null/null/0/0/0'
        this.REST_API_SERVER+'/'+cityId+'/'+index+'/'+franchiseId+'/'+storeId+'/'+fromDate+'/'+toDate+'/0'
        ).pipe(map(data => {
        this.OrderData=data['data'];
      }),catchError(err=>{
        this.auth.logout();
        return err}));
  }

  // getOrderData(){
  //   return this.OrderData;
  // }
  public settingDataForTabs(){
    //console.log('settingDataForTabs');

    this.newOrder=this.OrderData['newOrder'];
    this.assignedOrder=this.OrderData['acceptedOrderWeb'];
    this.acceptedOrder=this.OrderData['assignedOrder'];
    this.reachedAtStoreOrder=this.OrderData['reachedAtStoreOrder'];
    this.completedOrder=this.OrderData['completedOrder'];
    this.inDispatchOrder=this.OrderData['inDispatchOrder'];
    this.inProgress=this.OrderData['inProgress'];
    this.packageOrder=this.OrderData['packageOrder'];
    this.pickUpReadyOrder=this.OrderData['pickUpReadyOrder'];
    this.pickedUpOrder=this.OrderData['pickedUpOrder'];
    this.rejectedOrder=this.OrderData['rejectedOrder'];
    this.cancelledOrder=this.OrderData['cancelledOrder'];
    this.reachedCustomerOrder=this.OrderData['reachedCustomerOrder'];

   
  }
  public getAllOrderData(){
    return this.OrderData;

  }

  getreachedCustomerOrder(){

   return this.reachedCustomerOrder;

  }
  getcancelledOrder(){
    return this.cancelledOrder;
  }
  getassignedOrder(){
    return this.assignedOrder;
  }
  getreachedAtStoreOrder(){
    return this.reachedAtStoreOrder;
  }
  getRejectedOrder(){
    return this.rejectedOrder;
  }
  getPickedUpOrder(){
    return this.pickedUpOrder;
  }
  getPickUpReadyOrder(){
    return this.pickUpReadyOrder;
  }
  getPackageOrder(){
    return this.packageOrder;
  }
  getInProgress(){
    return this.inProgress;
  }
   getInDispatchOrder(){
     return this.inDispatchOrder;
   }
  getCompletedOrder(){
    return this.completedOrder;
  }
  getAcceptedOrder(){
    return this.acceptedOrder;
  }
  getNewOrder(){
    // //console.log("in getneworder");
    // //console.log(this.newOrder);
    return this.newOrder;
  }
}
