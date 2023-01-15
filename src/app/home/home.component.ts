import { Component, OnInit } from '@angular/core';
import { myArray } from './mySearchList';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myArr = myArray;

  inputText: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  search(event: any) {
    this.inputText = event.target.value;
    this.myArr = myArray.filter(v => v.name.toLowerCase().includes(this.inputText) || String(v.age).includes(this.inputText))
  }

  getString(value: any): any {
    let v = value;
    let sringValue = v.toString();
    return sringValue;
  }

}
