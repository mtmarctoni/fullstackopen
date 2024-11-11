:::mermaid
sequenceDiagram
    participant Browser as Browser
    participant Server as Server

    note right of Browser: Create New note - 'Save' button
    Browser->>Server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Server->>Browser: Response 302 Found
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
    Server->>Browser: Response 200 OK - HTML document
    note right of Browser: Render HTML page
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Server->>Browser: Response 200 OK - css style documunent
    note right of Browser: Apply CSS styles
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
    Server->>Browser: Response 200 OK - js document
    note right of Browser: Execute JavaScript code
    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Server->>Browser: Response 200 OK - json document
    note right of Browser: Render notes list
:::
