import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ActionService} from '../../../_services/action.service';
import { Component, OnInit ,Inject, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTable } from "@angular/material/table";
import {MatCheckboxModule} from '@angular/material/checkbox';
import { tableModel } from "../../../models/table.model";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {SelectionModel} from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../_services';
import { itemModel } from '../../../models/item.model';

 let ELEMENT_DATA: any = [];
// let ELEMENT_DATA=
//  [ {unitId: 1, itemName: 'Hydrogen', size: 1.0079, quantity: 'H',unitPrice: 'H'},
//       {unitId: 1, itemName: 'Hydrogen', size: 1.0079, quantity: 'H',unitPrice: 'H'},
    
//       {unitId: 1, itemName: 'Hydrogen', size: 1.0079, quantity: 'H',unitPrice: 'H'},
    
//       {unitId: 1, itemName: 'Hydrogen', size: 1.0079, quantity: 'H',unitPrice: 'H'},
    
//       {unitId: 1, itemName: 'Hydrogen', size: 1.0079, quantity: 'H',unitPrice: 'H'},
    
//       {unitId: 1, itemName: 'Hydrogen', size: 1.0079, quantity: 'H',unitPrice: 'H'},
    
//       {unitId: 1, itemName: 'Hydrogen', size: 1.0079, quantity: 'H',unitPrice: 'H'},
    
//       {unitId: 1, itemName: 'Hydrogen', size: 1.0079, quantity: 'H',unitPrice: 'H'},
    
//       {unitId: 1, itemName: 'Hydrogen', size: 1.0079, quantity: 'H',unitPrice: 'H'},
    
      // {unitId: 1, itemName: 'Hydrogen', size: 1.0079, quantity: 'H',unitPrice: 'H'}];
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})



export class UpdateComponent implements OnInit {
  setEditBtnColor:true;;
  displayedColumns: string[] = [
    'Select',
    "UnitId",
    "ItemName",
    "Size",
    "Quantity",
    "UnitPrice",
    "Action"

  ];
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  title= "Edit Order";
  message= "You can edit your Orders here";
  selectedChoice:'';
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  showFliter: boolean = false;
  makeClickable(){
    this.setEditBtnColor=true;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  constructor(public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private actionService :ActionService) {
       
      ELEMENT_DATA=this.data;
      console.log(ELEMENT_DATA);
      this.dataSource.data = ELEMENT_DATA['data'];
      this.dataSource = new MatTableDataSource(ELEMENT_DATA['data']);
      this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

  ngOnInit(): void {
    ELEMENT_DATA=this.data;
    console.log(ELEMENT_DATA['data']);
    this.dataSource = new MatTableDataSource<any>(ELEMENT_DATA['data']);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.actionService.events$.forEach(
      (event) => (this.showFliter = !this.showFliter)
    );

  }


  editQuanity(element){
    console.log(element);
  }
  onConfirm(): void {
  
  console.log(this.selection.selected);
  console.log(ELEMENT_DATA['data'].orderId);
  console.log(this.data.timeStamp);
  // console.log(this.selectedChoice);
  //     if(this.selectedChoice!=undefined){
  //     this.actionService.updateOrder(this.data._id, this.data.timeStamp,"update comment",this.selectedChoice).subscribe((reponse)=>{
  //     }); 
  // }

   

  
  //   this.dialogRef.close(true);
  }

  onDismiss(): void {

    this.dialogRef.close(false);
  }

}
