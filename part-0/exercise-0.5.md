sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server:  GET https://fullstack-exampleapp.herokuapp.com/spa
    Server-->>Browser: HTML-code

    Browser->>Server:  GET https://fullstack-exampleapp.herokuapp.com/main.css
    Server-->>Browser: main.css

    Browser->>Server:  GET https://fullstack-exampleapp.herokuapp.com/spa.js
    Server-->>Browser: spa.js


    Browser->>Server:  GET https://fullstack-exampleapp.herokuapp.com/data.json
    Server-->>Browser: JSON data: [{content: "fetchedMesssages", date: "2025-01-18"}, ...]

