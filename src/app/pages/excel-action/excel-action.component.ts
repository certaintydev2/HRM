import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { ExcelExportService } from '../../services/excel-export/excel-export.service';
import { environment } from 'src/environments/environment';
declare let $: any

@Component({
  selector: 'app-excel-action',
  templateUrl: './excel-action.component.html',
  styleUrls: ['./excel-action.component.scss']
})
export class ExcelActionComponent implements OnInit {

  
  @Input() downloadExceldata: any
  @Input() excelDetails: any
  @Input() uploadData: any
  @Input() flag  :any

  selected_file: any
  constructor(
    private ExcelService: ExcelExportService,
    private api: HttpClient,
    private ngxspinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  exportAsXLSX() {
    this.ngxspinner.show
    this.ExcelService.exportAsExcelFile(this.downloadExceldata, this.excelDetails.sheetname);
    this.ngxspinner.hide()
  }
  downloadDataForUpload() {
    this.ngxspinner.show
    this.ExcelService.exportAsExcelFile(this.uploadData, this.excelDetails.sheetname);
    this.ngxspinner.hide()
  }
  excelUpload(fies: any) {
    debugger;
    this.ngxspinner.show()
    this.selected_file = fies.target.files[0]
    let excelupload = new FormData()
    excelupload.append(this.excelDetails.sheetname, this.selected_file)
    this.api.post(environment.apiURL + "/" + this.excelDetails.uploadapi, excelupload).subscribe((result: any) => {
      if (result.status == 200) {
        window.location.reload()
      }
      else {
        this.ngxspinner.hide()
      }
    })
  }

  choseFile(event: any) {
    $("#choosefile").click();
  }
}



