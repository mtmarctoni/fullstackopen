:::mermaid
sequenceDiagram
    participant Browser as Browser
    participant Server as Server


    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
    Server->>Browser: Response 200 OK - HTML document
    note right of Browser: Render HTML page
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Server->>Browser: Response 200 OK - css style documunent
    note right of Browser: Apply CSS styles
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    Server->>Browser: Response 200 OK - js document spa.js
    note right of Browser: Execute JavaScript code
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Server->>Browser: Response 200 OK - json document
    note right of Browser: Render notes list
:::
