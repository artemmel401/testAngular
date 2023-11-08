import { Component, Input } from '@angular/core';
import { Ipoint } from 'src/app/models/point';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.css']
})
export class PointComponent {
  @Input() point: Ipoint
  @Input() changeSelectedCard: Function
}