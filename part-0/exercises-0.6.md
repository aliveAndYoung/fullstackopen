sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note_spa
    Note over Browser,Server: payload sent to define the content-type and the content itself a JSON-ed message
    Server-->>Browser: 201 Created

    Note over Browser: Browser uses the event handler and renders updated notes to display