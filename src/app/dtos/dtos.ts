
export class DtoRoute {

  idDriver!: number;
  idVehicle!: number;
  idClient!: number;
  idDevice!: number;
  startDate: Date | undefined;
  endDate: Date | undefined;
  estimatedStartDate: Date | undefined;
  estimatedEndDate: Date | undefined;
  description: string;
  routeDetails: DtoRouteDetail[];
}


export class DtoRouteDetail {

  idRoute!: number;
  idClient!: number;
  idDevice!: number;
  startDate: Date | undefined;
  endDate: Date | undefined;
  estimatedStartDate: Date | undefined;
  estimatedEndDate: Date | undefined;
}

// export class DtoRoute {

//   idDriver: number,
//   idClient: number,
//   idDevice: number,
//   startDate: Date,
//   endDate: Date,
//   estimatedStartDate: Date,
//   estimatedEndDate: Date
// }
