export interface IApiData{
  ships: {
    id: string,
    __typename: string,
    active: boolean,
    home_port: string,
    name: string,
    type: string
    roles: string[]
  }[]
}