# atmos
Weather API application that lets users check the cuurent temperate in Fahrenheit and Celcius both with the zip code.

## Tech Stack
TypeScript for additional static typing to make the code less error prone. 
Node.js for having a runtime that executes the code
Jest for testing
API: Open-Meteo API for getting weather by the coordinates.
     Zippopotam API for converitng zip codes to latitudes and longitudes.
Axios for making HTTP requests to APIs
Express for the web framework
Supertest for making fake HTTP requests for testing purposes.


### Prerequisites
- Node.js
- npm

### Installation
```bash
npm install
npm start
```
The server will be available at `http://localhost:8080`.

## API
For this application Open-Meteo API is used for getting the weather of the coordinates converted by the Zippopotam API from the zip codes entered by the user. 
I selected these two because they are free of cost and require no API key. They are also very easy to implement. 

### `GET /locations/:zipCode`
This route gets the zipcode from the user and requests the weather at that particular location. 

### Example Request
```
GET /locations/24060
GET /locations/90210?scale=Celsius
```

### Example Response
```json
{
  "temperature": 43,
  "scale": "Fahrenheit"
}
```

## Running Tests
```bash
npm test
```

## Design Decisions
APIs that I chose for this application because they were easy to implement, free of cost, and required no API keys which reduces security risk.

I seperated services and routes into different directories to avoid mess by putting everything into the same file. /routes handles all the requests and sends back responses whereas /services handles all the external APIs. This seperation not only makes the code organized, it also makes it very easy to debug the code if needed.

## AI Disclosure
I used AI to help with the project structure and for error handling and debugging the routes directory as well as some parts of the sevices directory. Further, I used it for generating a template for the README file. I have reviewed all the solutions given to me by AI and have understood them and take full resposibilty for it.

## Other Resources Used
www.typescriptlang.org: I used it for helping me write the correct syntax.
express.js: I used them to reference the routing part and the setup.
open-meteo.com: Referenced for respose format.
api.zippopotam.us: referenced for zip code lookup endpoint. 
https://jestjs.io/: For helping me with writing tests and the correct syntax. 





