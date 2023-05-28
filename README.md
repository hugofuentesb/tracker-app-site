# tracker-app-site

Welcome to tracker-app-site! This is a web application developed with Angular 15.

## Technologies Used
- Angular 15: The web development framework used to create the user interface and application logic.
- GraphQL: Query and manipulation language used to communicate with the server and efficiently retrieve data.
- Mapbox: Map platform used to display and visualize maps in the application.
- Guards: Mechanism used to protect routes and control access to specific parts of the application.
- Interceptor: Used to intercept and manipulate HTTP requests and responses before they are sent or received by the application.
- Websockets: Technology used to enable bidirectional and real-time communication between the client and server.
- PrimeNG: UI component library for Angular used to create an attractive and functional user interface.

## Application Features
- Communication with Node.js API: The application connects to a private Node.js API to retrieve and send data between the client and server.
- Security: Authentication and authorization systems are implemented in the Node.js API to ensure that only authorized users access protected resources.
- User Interface: A PrimeNG template is used to design and create an attractive and consistent user interface.
- Map Functionality: The Mapbox platform is used to display and visualize maps in the application, providing an enhanced user experience.
- LocalStorage: The browser's LocalStorage is utilized to store data locally on the client, allowing for the retention of certain user preferences and configurations.

## Requirements
- Node.js: Make sure you have Node.js installed on your system. You can download it from [here](https://nodejs.org).
- Dependencies: Run `npm install` to install all the necessary dependencies.
- Mapbox Account: You will need to create a Mapbox account at [https://www.mapbox.com/](https://www.mapbox.com/) in order to configure the map functionality.

## Configuration
1. Clone this repository: `git clone https://github.com/hugofuentesb/tracker-app-site.git`.
2. Navigate to the project directory: `cd tracker-app-site`.
3. Run `npm install` to install the dependencies.
4. Configure the environment variables in the environments folder (you can use the example files in the environments-example folder as a reference).

## Usage
1. Run `ng serve` to start the development server.
2. Open your web browser and visit `http://localhost:4200` to access the application.

## Support
If you have any questions or issues, please open an issue in the [issue repository](https://github.com/your-username/your-repository/issues) so that we can assist you.

**Note:** Please be aware that this application cannot be executed without the corresponding Node.js API and access to the database. If you are interested in obtaining access to the API and using this application, please contact me for more information.