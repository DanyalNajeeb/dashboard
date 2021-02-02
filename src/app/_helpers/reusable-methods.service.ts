import { Injectable } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { OrderService } from '../_services/order.service';
import {tableModel} from '../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class ReusableMethodsService {
Data:tableModel[];
  constructor(private orderService: OrderService) {}

  public getData(tabSelected:any, tabSelectedIndex:any):any{
    this.orderService.getOrderData().subscribe((data: any[]) => {
    this.Data=data['data'];
    return this.Data;

    });
  }
}
