import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ActionService} from '../../../_services/action.service';
import { Component, OnInit ,Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../_services';

@Component({
  selector: 'app-close-modal',
  templateUrl: './close-modal.component.html',
  styleUrls: ['./close-modal.component.css']
})
export class CloseModalComponent implements OnInit {
  title= "Confirm Action";
  message= "Are you sure you want to cancel?";

  constructor(public dialogRef: MatDialogRef<CloseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private actionService :ActionService
    
    ) { }

  ngOnInit(): void {
  }
  onConfirm(): void {

    this.actionService.cancelOrder(this.data._id, this.data.timeStamp,"cancel comment").subscribe((reponse)=>{
      //console.log(reponse);
     }); 
;
   

  
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    //console.log("dismiss");

    this.dialogRef.close(false);
  }
  // Are you sure you want Cancel order ?
}

