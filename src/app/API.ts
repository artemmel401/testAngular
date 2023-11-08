import { gql } from "apollo-angular";

export const SHIPS = gql` query Query{
  ships {
  active
  home_port
  id
  name
  type
  roles
}
}`;

