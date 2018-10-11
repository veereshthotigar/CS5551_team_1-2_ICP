import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=88014&sources=ONCHigh
  //https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=384455&sources=DrugBank
  constructor() { }

  ngOnInit() {
  }

}
