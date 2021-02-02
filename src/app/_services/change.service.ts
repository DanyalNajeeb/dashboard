import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeService {
  dtt:any;
  private dataSource = new BehaviorSubject(this.dtt);
  data = this.dataSource.asObservable();
  constructor() { }
  updatedDataSelection(data: any){
    this.dataSource.next(data);
  }
}
