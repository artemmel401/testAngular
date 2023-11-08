import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { IfilterList } from 'src/app/models/filterList';

@Component({
  selector: 'filter-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent {
  displayCheckBoxes = false
  @Input() checkBoxList: IfilterList
  @Input() changeActive: Function

  countDisplayCheckboxes():number{
    let count = 0
    for (let checkbox in this.checkBoxList.list){
      if (this.checkBoxList.list[checkbox].isActive){
        count +=1
      }
    }
    return count
  }
}