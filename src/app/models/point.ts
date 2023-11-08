export interface Ipoint {
  id: string,
  title: string,
  attributes: {
    key: string,
    value: string
  }[]
}

export interface IPointFront extends Ipoint {
  attributes: {
    key: string,
    value: string,
    isActive: boolean
  }[]
}

export interface IFullPoint {
  id: string,
  __typename: string,
  active: boolean,
  home_port: string,
  name: string,
  type: string,
  roles: string[]
}

export interface IVariants {
  "id": string, 
  "value": string
}