import { TouristPlaces } from "./tourist.places.model"

export class CompanyTariffs {
  id: Number
  place: TouristPlaces

  cost: Number

  companyId: string
  lastUpdated: Date
}
