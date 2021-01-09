import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Bloc, getDisplayNameBloc } from 'src/app/models/Bloc';
import { getDisplayName, Section } from 'src/app/models/Section';

@Component({
  selector: 'app-filter-menu-student',
  templateUrl: './filter-menu-student.component.html',
  styleUrls: ['./filter-menu-student.component.css']
})
export class FilterMenuStudentComponent implements OnInit {
  faSearch = faSearch;
  selectSection: number = 0;
  selectBloc: number = 0;
  searchInput: string = "";
  @Output() sectionEmitter: EventEmitter<Number> = new EventEmitter<Number>()
  @Output() blocEmitter: EventEmitter<Number> = new EventEmitter<Number>()
  @Output() searchEmitter: EventEmitter<String> = new EventEmitter<String>()
  blocs: Map<String, Number> = new Map;
  sections: Map<String, Number> = new Map;

  constructor() { }

  ngOnInit(): void {
    this.initSelects()
  }

  initSelects() {
    let valuesBloc: string[] = []
    let valuesSection: string[] = []
    Object.keys(Bloc).map((val, i) => {
      console.log(val);

      if (i < 3) {
        valuesBloc.push(val);
      }
      return;
    })
    Object.keys(Section).map((val, i) => {
      console.log(val);

      if (i < 3) {
        valuesSection.push(val);
      }
      return;
    })
    valuesBloc.forEach(key => {
      this.blocs.set(getDisplayNameBloc(+key), +key)
    });
    valuesSection.forEach(key => {
      this.sections.set(getDisplayName(+key), +key)
    });
    this.blocs.forEach((val, key, map) => {
      console.log(`Key : ${key} Val : ${val}`);

    })
    this.sections.forEach((val, key, map) => {
      console.log(`Key : ${key} Val : ${val}`);

    })

  }

  onSectionSelected($event) {
    const value: number = $event.target.value
    console.log(value)
    this.sectionEmitter.emit(value)
  }

  onBlocSelected($event) {
    const value: number = $event.target.value
    console.log(value)
    this.blocEmitter.emit(value)
  }

  onKeyUp($event) {
    const value: string = $event.target.value
    console.log(value)
    this.searchEmitter.emit(value)
  }

}
