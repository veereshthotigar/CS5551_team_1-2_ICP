import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSources:string[];
  rxcui:string;
  dataSourceSelected:string = 'DrugBank';
  url:string;
  result:Observable<any>;
  constructor(private http: HttpClient) {
    this.rxcui = "";
    this.dataSources = ['ONCHigh','DrugBank'];
   }
  selectDataSource(src:string){
    this.dataSourceSelected = src;
  }
  retriveData(){
    this.url = 'http://127.0.0.1:3000/api/rxlist?rxcui='+this.rxcui+'&sources='+this.dataSourceSelected;
    this.result = String[''];
    this.http.get(this.url)
      .subscribe(
        (res:any)=>{
          this.result = res.interactionTypeGroup[0].interactionType;
          console.log(this.result);
        }
      )
  }
  ngOnInit() {
  }

}
