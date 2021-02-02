import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { CommentPanelComponent } from "../../../../shared/comment-panel/comment-panel.component";
import { UpdateComponent } from "../../../../shared/update/update.component";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource, MatTable } from "@angular/material/table";
import { CloseModalComponent } from "../../../../shared/close-modal/close-modal.component";
import { tableModel } from "../../../../../models/table.model";
import { HttpClient } from "@angular/common/http";
import { OrderService } from "../../../../../_services/order.service";
import { mqttManager } from "../../../../../_services/mqtt-manager.service";
import { ReusableMethodsService } from "../../../../../_helpers/reusable-methods.service";
import { ChangeService } from "../../../../../_services/change.service";
import { ActionService } from "../../../../../_services/action.service";
declare var $: any;
// declare var jQuery: any;
declare var google: any;

let ELEMENT_DATA: any = [];
enum paymentType {
  Paid = 1,
  COD = 2,
}
enum serviceType {
  Delivery = 1,
  Take_away = 2,
}
@Component({
  selector: "app-reached",
  templateUrl: "./reached.component.html",
  styleUrls: ["./reached.component.css"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class ReachedComponent implements OnInit {
  dataSource = new MatTableDataSource<tableModel>();
  displayedColumns: string[] = [
    "id",
    "outlet",
    "customer",
    "rider",
    "status",
    "payment",
    "service",
    "zone",
    "actions",
  ];
  expandedElement: tableModel | null;
  onLoadLatitude: any;
  onLoadLongitude: any;
  dropLoadLatitude: any;
  dropLoadLongitude: any;
  storeMap: any;
  selectedmarker: any = [];
  selectedmarkerStore: any = [];
  availableProMarker: any = [];
  placeStoreMarker: any = [];
  assignedDriverMarker: any = [];
  orderNo: any;
  orderId: any;
  rider: any;
  items: any;
  checkfirst: boolean = false;
  statusMsg = "REACHED";
  timeStamp: any;
  result: string = "";
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  orderActivity: [];
  sortedActivity = [];
  dispatcherComments: any;
  selectedTab = 0;
  showFliter: boolean = false;

  schldForstatus() {
    return true;
  }
  constructor(
    private actionService: ActionService,
    private changeDetectorRefs: ChangeDetectorRef,
    private CS: ChangeService,
    public MqttManager: mqttManager,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog,
    private httpClient: HttpClient,
    private orderService: OrderService
  ) {
    this.orderService.settingDataForTabs();
    ELEMENT_DATA = this.orderService.getreachedAtStoreOrder();
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);

    this.CS.data.subscribe((data) => {
      if (this.checkfirst) {
        this.orderService.settingDataForTabs();
        ELEMENT_DATA = this.orderService.getreachedAtStoreOrder();
        this.dataSource.data = ELEMENT_DATA;
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.table.renderRows();
      }
      this.checkfirst = true;
    });
  }
  check() {}
  getComment(data: any) {
    var i = 0;
    //TODO: chnage logic show latest added comment regardless of current status
    var high = 0;
    var comment = "";
    for (i = 0; i < data.length; i++) {
      //console.log(data[i].orderStatus);

      if (high <= data[i].timestamp) {
        high = data[i].timestamp;
        comment = data[i].comment;
      }

      //old logic
      // if (data[i].orderStatus == this.statusMsg.toLowerCase()) {
      //   return data[i].comment;
      //   break;
      // }
    }
    return comment;
  }
  initDrillDown(element: any) {
    this.selectedTab = 0;
    this.dispatcherComments = element.dispatcherComments;
    if (this.dispatcherComments) {
      this.dispatcherComments = this.getComment(this.dispatcherComments);
    }

    this.sortedActivity = [];

    this.clearMap();
    this.items = element["Items"];
    this.orderActivity = element["timeStamp"];
    for (var key in this.orderActivity) {
      this.sortedActivity.push({ key: key, value: this.orderActivity[key] });
    }
    this.sortedActivity.sort(function (a, b) {
      return a.value.timeStamp - b.value.timeStamp;
    });

    var temp = element["driverDetails"].driversLatLongs.split(",");
    this.onLoadLatitude = temp[0];
    this.onLoadLongitude = temp[1];
    this.dropLoadLatitude = element["drop"].location.latitude;
    this.dropLoadLongitude = element["drop"].location.longitude;

    setTimeout(() => {
      this.storeGoogleMap(this.onLoadLatitude, this.onLoadLongitude, element);
    }, 50);

    this.expandedElement = this.expandedElement === element ? null : element;

    return (this.expandedElement =
      this.expandedElement === element ? null : element);
  }
  paymentType(type) {
    return paymentType[type];
  }
  serviceType(type) {
    if (type == 2) {
      return "Take Away";
    }
    return serviceType[type];
  }
  public storeAddress(data) {
    return data.substring(0, data.lastIndexOf("-"));
  }
  commentPopUp(order: any) {
    this.actionService.setStatus(order);
    this.orderNo = order.orderId;
    this.timeStamp = Math.round(+new Date() / 1000);
    const dialogRef = this.dialog.open(CommentPanelComponent, {
      width: "300px",
      data: { _id: this.orderNo, timeStamp: this.timeStamp, status: "reached" },
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
    });
  }
  storeGoogleMap(param1, param2, element) {
    var directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
    });
    var directionsService = new google.maps.DirectionsService();
    var map: any;
    var to = new google.maps.LatLng(param1, param2);
    var from = new google.maps.LatLng(
      this.dropLoadLatitude,
      this.dropLoadLongitude
    );
    var mapOption = {
      zoom: 14,
      center: to,
    };
    map = new google.maps.Map(
      document.getElementById("dispatchermap" + element._id),
      mapOption
    );
    var marker = new google.maps.Marker({
      position: from,
      icon: "assets/images/homeMarker.png",
      map: map,
    });
    var mark = new google.maps.Marker({
      position: to,
      icon: "assets/images/delivery.png",
      map: map,
    });
    this.storeMap = map;
    var request = {
      origin: to,
      destination: from,
      travelMode: "DRIVING",
    };
    mark.setMap(map);
    marker.setMap(map);
    directionsRenderer.setMap(map);
    directionsService.route(request, function (result, status) {
      if (status == "OK") {
        directionsRenderer.setDirections(result);
      }
    });
  }
  clearMap() {
    for (var i = 0; i < this.selectedmarker.length; i++) {
      this.selectedmarker[i].setMap(null);
    }
    this.selectedmarker = [];

    for (var i = 0; i < this.selectedmarkerStore.length; i++) {
      this.selectedmarkerStore[i].setMap(null);
    }
    this.selectedmarkerStore = [];

    for (var i = 0; i < this.availableProMarker.length; i++) {
      this.availableProMarker[i].setMap(null);
    }
    this.availableProMarker = [];

    for (var i = 0; i < this.placeStoreMarker.length; i++) {
      this.placeStoreMarker[i].setMap(null);
    }
    this.placeStoreMarker = [];

    for (var i = 0; i < this.assignedDriverMarker.length; i++) {
      this.assignedDriverMarker[i].setMap(null);
    }
    this.assignedDriverMarker = [];

    // this.storeGoogleMap(this.onLoadLatitude, this.onLoadLongitude);
    this.ref.detectChanges();
  }
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.actionService.events$.forEach(
      (event) => (this.showFliter = !this.showFliter)
    );
  }
  applyFilter(event: string) {
    this.dataSource.filter = event.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  denyOrder(order) {
    this.orderNo = order.orderId;
    this.timeStamp = Math.round(+new Date() / 1000);
    const dialogRef = this.dialog.open(CloseModalComponent, {
      width: "300px",
      data: { _id: this.orderNo, timeStamp: this.timeStamp },
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
    });
  }
  updateOrder(order) {
    this.orderNo = order.orderId;
    this.timeStamp = Math.round(+new Date() / 1000);
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: "300px",
      data: { _id: this.orderNo, timeStamp: this.timeStamp },
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.result = dialogResult;
    });
  }
}
