:::mermaid
sequenceDiagram
    participant Browser as Browser
    participant Server as Server

    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Server->>Browser: Response 201 Created - message: 'note created'
:::
