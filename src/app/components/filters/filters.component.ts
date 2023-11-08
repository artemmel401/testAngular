import { IVariants } from 'src/app/models/point';
import { IfilterList } from '../../models/filterList';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  @Input() radiobuttons: IfilterList
  @Input() checkboxes: IfilterList
  @Input() variants: IVariants[]
  @Input() getVariants: Function
  @Input() changeAttribute: Function
  @Input() changeSelectedCard: Function

  changeInput = (event: Event) =>{
    this.getVariants((event.target as HTMLInputElement).value)
  }
}