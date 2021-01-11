import { Component, OnInit } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-drag-zone-excel',
  templateUrl: './drag-zone-excel.component.html',
  styleUrls: ['./drag-zone-excel.component.css']
})
export class DragZoneExcelComponent implements OnInit {
  faUpload = faUpload
  files: File[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(event) {
    console.log(event);
    this.files = []
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  verifyExtension() {
    var isExcelFile = 1;
    if(this.files==null)isExcelFile=0;
    this.files.forEach(file=> {
      if(file.name.slice((file.name.lastIndexOf('.') - 1 >>> 0) + 2) != "xlsx"){
        isExcelFile = 0;
      };
    });
    return (isExcelFile == 1);

  }
}
