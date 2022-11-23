import { Company } from "./company.model"

export class CompanyListResponse {
  message: string = ""
  companies: Company[] = []
}
