import { CompanyTariffs } from "./company.tariffs.model"

export class Company {
  id: string = ""
  password: string = ""
  confirmPassword: string = ""
  branchName: string = ""
  place: string = ""
  website: string = ""
  contact: string = ""
  email: string = ""
  tariffs: CompanyTariffs[] = []
}
