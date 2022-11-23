import { TouristPlaces } from "./tourist.places.model"

export class CompanyTariffs {
  place: TouristPlaces

  cost: Number

  companyId: string

  constructor(place: TouristPlaces, cost: Number, companyId: string) {
    this.place = place
    this.cost = cost
    this.companyId = companyId
  }
}
