import { lastValueFrom } from 'rxjs';
import { IfilterList} from './models/filterList';
import { IFullPoint, IPointFront, IVariants, Ipoint } from './models/point';
import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { SHIPS } from './API';
import { IApiData } from './models/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  points: IPointFront[] = []
  filterPoints: IPointFront[] = []
  fullPoints: IFullPoint[]
  currentStage: number = 0

  variants: IVariants[] = []
  isCardSelected = false
  selectedCard: IFullPoint;

  constructor(private apollo: Apollo){}

  async ngOnInit() {
    const data = await lastValueFrom(this.apollo.query({query: SHIPS}))
    let newPoints:Ipoint[] = []
    for (let ship in (data.data as IApiData).ships){
      let shipObj = (data.data as IApiData).ships[ship]
      let result:Ipoint = {
        "id": shipObj.id,
        "title": shipObj.name,
        "attributes": []
      }
      for (let attribute in shipObj){
        if (attribute === 'home_port' || attribute === 'type'){
          result.attributes.push({
            "key": attribute,
            "value": shipObj[attribute as keyof typeof shipObj].toString()
          })
        }
      }
      newPoints.push(result)
    }
    let pointFront:IPointFront[] = []
    for (let point in newPoints){
      let newAttributes = [] as Array<{"key": string, "value": string, "isActive": boolean}>
      for (let attribute in newPoints[point].attributes){
        
        newAttributes.push({
          ...newPoints[point].attributes[attribute],
          isActive: false
        })
      }
      pointFront.push({
        "title": newPoints[point].title,
        "id":newPoints[point].id,
        "attributes": newAttributes
      })
    }
    this.points = pointFront
    this.fullPoints = (data.data as IApiData).ships
  }

  getPointListByStage = (stage: number) =>{
    console.log(this.filterPoints)
    console.log(stage === 0 ? 0 : (5 * stage), stage === 0 ? 5 : (5 * stage + 5))
    let newPointList = this.filterPoints.slice(stage === 0 ? 0 : (5 * stage), stage === 0 ? 5 : (5 * stage + 5))
    console.log(newPointList)
    return newPointList
  }
  getSelectedCardAttributes() {
    type newattribuestype = Omit<IFullPoint, "roles" | "id" | "name">
    let newAttributes: newattribuestype = {
      __typename: this.selectedCard.__typename,
      active: this.selectedCard.active,
      home_port: this.selectedCard.home_port,
      type: this.selectedCard.type,
    }
    return newAttributes
  }

  changeCurrentStage = (isNext: boolean) =>{
    if (isNext && (this.currentStage + 1)*5 <= this.filterPoints.length){ 
      this.currentStage+=1
    }
    else if(this.currentStage > 0){
      this.currentStage-=1
    }
  }
  changeAttribute = (name:string, attribute:string):void =>{
    let result: IPointFront[] = []
    for (let point in this.points){
      if (attribute=== 'radiobutton'){
        this.points[point].attributes[0].isActive = false
      }
      if (this.points[point].attributes[1].value === name && attribute === 'checkbox'){
        this.points[point].attributes[1].isActive = !this.points[point].attributes[1].isActive
      }
      else if (this.points[point].attributes[0].value === name && attribute=== 'radiobutton'){
        this.points[point].attributes[0].isActive = !this.points[point].attributes[0].isActive
      }
    }
    for (let point in this.points){
      for (let attribute in this.points[point].attributes){
        if (this.points[point].attributes[attribute].isActive){
          result.push(this.points[point])
        }
      }
    }
    const uniqueArray = result.filter((obj, index, self) =>
      index === self.findIndex((o) => (
        o.id === obj.id
      ))
    );
    this.filterPoints = uniqueArray
  }
  changeSelectedCard = (id: string) =>{
    this.isCardSelected = true
    for (let point in (this.fullPoints as IFullPoint[])){
      if ((this.fullPoints as IFullPoint[])[point].id === id){
        this.selectedCard = (this.fullPoints as IFullPoint[])[point]
        console.log(this.selectedCard)

      }
    }
  }

  getCheckBoxes():IfilterList{
    let result:IfilterList  = {
      "title": this.points[0].attributes[1].key,
      "list": [] as Array<{"value": string, "isActive": boolean}>
    }
    for (let i in this.points){
      result.list.push({
        "value": this.points[i].attributes[1].value,
        "isActive": this.points[i].attributes[1].isActive
      })
    }
    const uniqueArray = result.list.filter((obj, index, self) =>
      index === self.findIndex((o) => (
        o.value === obj.value
      ))
    );
    result.list = uniqueArray
    return result
  }
  getRadiobuttons(): IfilterList {
    let result: IfilterList = {
      "title": this.points[0].attributes[0].key,
      "list": [] as Array<{ "value": string, "isActive": boolean }>
    }
    for (let i in this.points) {
      if (this.points[i].attributes[0].value) {
        result.list.push({
          "value": this.points[i].attributes[0].value,
          "isActive": this.points[i].attributes[0].isActive
        })
      }
    }
    const uniqueArray = result.list.filter((obj, index, self) =>
      index === self.findIndex((o) => (
        o.value === obj.value
      ))
    );
    result.list = uniqueArray
    return result
  }
  getFilterTitles = (value: string | null):void =>{
    if (value != null){
      if (value === ''){
        this.variants = []
        return 
      }
      let result:IVariants[] = []
      for (let point in this.points){
        if (this.points[point].title.toLowerCase().includes(value.toLowerCase())){
          result.push({"id": this.points[point].id,
           "value": this.points[point].title
          })
        }
      }
      this.variants = result
    }
  }
}
