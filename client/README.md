## Client Overview
The client is programmed using React.JS . The website is organized in to a number of views which users can assess and occassionally utilize seperate components. Most of the time, most of the code for a view is located directly in its .js file. As such, to edit the function and appearance of a web page, that page should roughly correspond to its view folder name and should be easily located. Any additional functionality implemented by a seperate component can be found by examining the import location of that component. 


## File structure
`client` - Holds the client application
- `public` - This holds all of our static files
- `src`
    - `assets` - This folder holds assets such as images, docs, and fonts
    - `components` - This folder holds all of the different components that will make up our views
    - `views` - These represent a unique page on the website i.e. Home or About. These are still normal react components
    - `App.js` - This is what renders all of our browser routes and different views
    - `index.js` - This is what renders the react app by rendering App.js, should not change
- `package.json` - Defines npm behaviors and packages for the client

