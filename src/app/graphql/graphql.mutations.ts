import {gql} from 'apollo-angular'


export const GET_ALL_DRIVERS = gql`
  query {
    drivers: getAllDrivers {
      id
      name: username
    }
  }`;

  

export const  ADD_ROUTE = gql`
  mutation AddRoute($input: RouteInput!) {
    addRoute(input: $input) {
      idDriver
    }
  }`;

export const  START_ROUTE = gql`
  mutation StartRoute($input: StartRouteInput!) {
    startRoute(input: $input) {
      id
    }
  }`;

export const  CANCEL_ROUTE = gql`
  mutation CancelRoute($input: CancelRouteInput!) {
    cancelRoute(input: $input) {
      id
    }
  }`;

export const  FINISH_ROUTE = gql`
  mutation FinishRoute($input: FinishRouteInput!) {
    finishRoute(input: $input) {
      id
    }
  }`;





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
