import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.css']
})
export class FilterTableComponent implements OnInit {
  resultArray: Array<String> = []
  showArray: Array<String> = []
  filter: string = ''
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getData().subscribe(
      (res) => {
        this.resultArray = res
      },
      (err) => {
        console.error('Error:',err)
      },
      () => {
        console.log('Request complete')
        this.showArray = this.resultArray
      }
    );
  }

  getData() : Observable<any> {
    return this.http.get('https://api.publicapis.org/categories');
  }

  onFilterChange(event:any){
    console.log(event.target.value)
    this.showArray = this.resultArray.filter(x => x.toUpperCase().includes(event.target.value.toUpperCase()))
  }
}
