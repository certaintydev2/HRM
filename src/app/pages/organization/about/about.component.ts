import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  @ViewChild('callDisplyaImgDialog') callDisplyaImgDialog!: TemplateRef<any>;
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  _albumfullview:[] = []

  _albumlist:any =[
    'assets/images/slider1.JPG',
    'assets/images/slider2.JPG'
  ]

  
  onePopUpDisplay(i:any) {
    this._albumfullview = i;
    let dialogRef = this.dialog.open(this.callDisplyaImgDialog, { 
      disableClose: true,
      panelClass: 'my-class', 
    } );
  }

  dismissGallaryPopup(album:any){
    this._albumfullview.splice(album, 1);
  }
}
