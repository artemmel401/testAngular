import { Component, Input } from '@angular/core';
import { IfilterList } from 'src/app/models/filterList';

@Component({
  selector: 'filter-radioButton',
  templateUrl: './radioButton.component.html',
  styleUrls: ['./radioButton.component.css'],
})
export class RadioButtonComponent {
  @Input() radiobuttonList: IfilterList
  @Input() changeActive: Function
}