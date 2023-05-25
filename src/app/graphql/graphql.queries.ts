import {gql} from 'apollo-angular'

export const LOGIN = gql`
query login($username: String!, $password: String!) {
  loginData: login(username: $username, password: $password) {
   username
   token
  }
}`;




export const GET_ALL_DRIVERS = gql`
  query {
    drivers: getAllDrivers {
      id
      username
      licenseDriving
      identificationNumber
      name
      lastName
      activeRow
      urlPic
    }
  }`;

  export const GET_DRIVER = gql`
  query getDriver($id: Int!, $activeRow: Boolean!) {
    driver: getDriver(id: $id, activeRow: $activeRow) {
      id
      username
      rating
      licenseDriving
      identificationNumber
      urlPic
      firstName
      lastName
    }
  }`;


  export const GET_CLIENT = gql`
  query getClient($id: Int!, $activeRow: Boolean!) {
    client: getClient(id: $id, activeRow: $activeRow) {
      id
      name
      urlLogo
      phoneNumber
      mainAddress
    }
  }`;

  export const GET_VEHICLE = gql`
  query getVehicle($id: Int!, $activeRow: Boolean!) {
    vehicle: getVehicle(id: $id, activeRow: $activeRow) {
      id
      plate
      urlPic
    }
  }`;





export const GET_ALL_ROUTES = gql`
  query {
    routes: getAllRoutes {
      id
      idDriver
      idVehicle
      idDevice
      activeRow
      status
    }
  }`;

  export const GET_ALL_INFO_ROUTES = gql`
  query {
    routes: getInfoRoutes {
      id
      idDriver
      idVehicle
      idDevice
      idClient
      status
      estimatedStartDate
      estimatedEndDate
      startDate
      endDate
      driverName
      clientName
      vehiclePlate
    }
  }`;

  // export const GET_ALL_ROUTE_DETAILS = gql`
  // query GetAllRouteDetails($idRoute: Int!) {
  //   getAllRouteDetails(idRoute: $idRoute) {
  //     id
  //     idRoute
  //     lng
  //   }
  // }`;
  
export const GET_ALL_ROUTE_DETAILS = gql`
query getAllRouteDetails($idRoute: Int!, $activeRow: Boolean!) {
  routeDetails: getAllRouteDetails(idRoute: $idRoute, activeRow: $activeRow) {
    id
    lng
    lat
    secuence
  }
}`;

  export const GET_ALL_VEHICLES = gql`
  query {
    vehicles: getAllVehicles {
      id
      plate
      urlPic
    }
  }`;

export const GET_ALL_CLIENTS = gql`
  query {
    clients: getAllClients {
      id
      name
      activeRow
      urlLogo
      phoneNumber
      mainAddress
    }
  }`;

  export const GET_ALL_DEVICES = gql`
  query {
    devices: getAllDevices {
      id
      description
      activeRow
    }
  }`;

  export const GET_ALL_PACKAGES = gql`
  query {
    packages: getAllPackages {
      id
      description
      activeRow
    }
  }`;







const GET_TODOS = gql`
  query {
    todos {
      id
      name
      description
    }
  }
`

const ADD_TODO = gql`
  mutation addTodo($name: String!, $description: String!) {
    addTodo(name: $name, description: $description) {
      id
      name
      description
    }
  }
`

const DELETE_TODO = gql`
  mutation deleteTodo($id: Int!) {
    deleteTodo(id: $id) {
      id
    }
  }
  `

// export { GET_ALL_DRIVERS, GET_TODOS, ADD_TODO, DELETE_TODO}
