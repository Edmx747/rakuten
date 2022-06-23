import { Weather } from 'src/app/models/weather';
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() datas: Weather[];
  @Input() time: string;

  constructor() { }
  ngOnInit(): void {
  }
  getTime(index: number): string {
    return moment(this.time,'LLLL LTS').add(this.datas[index].timezone,'s').format('LTS');
  }
}
