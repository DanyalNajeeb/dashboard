import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";
import { ActionService } from "../../../_services/action.service";

@Component({
  selector: "commentPanel",
  templateUrl: "./comment-panel.component.html",
  styleUrls: ["./comment-panel.component.css"],
})
export class CommentPanelComponent implements OnInit {
  title = "Create New Comment";
  commentReason: string;
  OrderStatus = "";
  status: any[];
  // =[
  //   {id:0,name:'created'},
  //   {id:1,name:'assigned'},
  //   {id:2,name:'accepted'},
  //   {id:3,name:'reached'},
  //   {id:4,name:'dispatched'},
  //   {id:5,name:'delivered'},
  //   {id:6,name:'cancelled'},
  //   {id:7,name:'rejected'},
  // ];
  reasons = [
    { id: 1, name: "High Wait Time at Store" },
    { id: 2, name: "Rider forgot to mark timestamp" },
    { id: 3, name: "Order Not Packed" },
    { id: 4, name: "Multiple Order at same time" },
    { id: 5, name: "Long Distance Order" },
    { id: 6, name: "Address incomplete" },
    { id: 7, name: "Wrong Address" },
    { id: 8, name: "Delay due to weather" },
    { id: 9, name: "Vehicle Breakdown" },
    { id: 10, name: "No Stock at the Store" },
    { id: 11, name: "Delay in Accepting Order by the Store" },
    { id: 12, name: "Delay in Assigning Order to the Rider" },
    { id: 13, name: "Fake Order" },
  ];

  constructor(
    public dialogRef: MatDialogRef<CommentPanelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private actionService: ActionService
  ) {
    this.status = this.actionService.getStatus();
    this.OrderStatus = this.status.slice(-1)[0].key;
  }

  ngOnInit(): void {}

  onConfirm(): void {
    if (this.commentReason != undefined) {
      this.actionService
        .commentOrder(
          this.data._id,
          this.data.timeStamp,
          this.commentReason,
          this.OrderStatus
        )
        .subscribe((reponse) => {});
    }
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
