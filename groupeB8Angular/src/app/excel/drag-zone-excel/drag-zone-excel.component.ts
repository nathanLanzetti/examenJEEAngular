import { Component, OnInit } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import * as xlsx from 'xlsx';
import {ListesEtudiantsService} from '../../services/listes-etudiants.service';

@Component({
  selector: 'app-drag-zone-excel',
  templateUrl: './drag-zone-excel.component.html',
  styleUrls: ['./drag-zone-excel.component.css']
})
export class DragZoneExcelComponent implements OnInit {
  faUpload = faUpload
  files: File[] = [];
  data: [][];

  constructor(private listes: ListesEtudiantsService) { }

  ngOnInit(): void {
  }

  onSelect(event: any) {
    console.log(event);
    this.files = []
    this.files.push(...event.addedFiles);

    const target: DataTransfer = <DataTransfer>(event.target);
    if(this.verifyExtension() == false) return;
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) =>{
      const bstr: string = e.target.result;

      const wb: xlsx.WorkBook = xlsx.read(bstr, {type: 'binary'});
      const wsEtudiants: string = wb.SheetNames[0];
      const ws: xlsx.WorkSheet = wb.Sheets[wsEtudiants];

      console.log(ws);
      this.data = (xlsx.utils.sheet_to_json(ws,{header: 1}));
      console.log(this.data);
      this.listes.setData(this.data);

    };

    reader.readAsBinaryString(this.files[0]);

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
