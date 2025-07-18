Create .env
    DB_CONN=[DATABASE CONNECTION STRING]
    PORT=[PORT NUMBER]
    PASSPORT_SECRET=[ANY STRING]
    PASSPORT_COOKIE=[ANY STRING]

Start with npm i
Run with npm start

To read the program, it's important to understand the pipeline of information
    -router receives the http requests and sends them to the appropriate controller
    -controller acts as the central hub that brings all of the different
        components of a certain function together
    -handler accesses primitive functions implicit to the model
    -model defines the structure of a schema, its functions, and its middleware
    -renderer uses the information given to it to render the request on the screen