import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=88014&sources=ONCHigh
  //https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=384455&sources=DrugBank
  dataSources:string[];
  rxcui:string;
  dataSourceSelected:string = 'DrugBank';
  url:string;
  result:Observable<any>;
  constructor(private http: HttpClient) {
    this.rxcui = "88014";
    this.dataSources = ['ONCHigh','DrugBank'];
   }
  selectDataSource(src:string){
    this.dataSourceSelected = src;
  }
  retriveData(){
    this.url = 'https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui='+this.rxcui+'&sources='+this.dataSourceSelected;
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
