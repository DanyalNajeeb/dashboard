import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {OrderService} from '../../../_services/order.service';
import { Paho } from '../../../utils/mqtt';
import {mqttManager} from '../../../_services/mqtt-manager.service';
import { Route, Router } from '@angular/router';
import { ChangeService } from '../../../_services/change.service';
import {MatTabChangeEvent} from '@angular/material/tabs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActionService } from '../../../_services/action.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tabSelected=0;
  selectedLableTab: any;
  displayTabs=true;
  displayTable=false;
  OrderData:any;
  checkif=false;
  selectedIndex;
  constructor( private CS:ChangeService, private router:Router, private httpClient:HttpClient , private orderService:OrderService,
     public MqttManager:mqttManager,private actionService:ActionService
     ) {
      this.selectedIndex=0;
    if (!this.MqttManager._client.isConnected()) {
      this.MqttManager.connect();
      setTimeout(() => {
        this.getMqttMessage();
      }, 30)
    } else {
      this.getMqttMessage();
    }
   }
  ngOnInit(): void {
    this.getOrderData();
  }
  toggle(){
    this.actionService.newEvent('clicked');
    // this.showFliter = !this.showFliter
}
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
     this.selectedIndex=tabChangeEvent.index;
  }
  tabsStatus(event){this.tabSelected=event.index;}
  getOrderData(){
      this.orderService.getOrderData().subscribe((data:any)=>{
      this.orderService.settingDataForTabs();
      this.OrderData=this.orderService.getAllOrderData();
      this.displayTabs=true;
      this.displayTable=true;
      if(this.checkif){
      this.CS.updatedDataSelection(this.OrderData);
      }
      this.checkif=true;
    });
  }

  reload(){
    this.displayTabs=false;
    this.getOrderData();

  }
  getMqttMessage(channeldata?: any){
    this.MqttManager.getMessages().subscribe((message: Paho.MQTT.Message) => {
      let mqttMessage = JSON.parse(message.payloadString);
      // console.log("mqttMessage destinationName", mqttMessage); 
      this.displayTabs=false;
      this.getOrderData();
    });
  }
}
 