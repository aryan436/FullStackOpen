```mermaid
sequenceDiagram
    participant browser 
    participant server
    note right of browser :user clicks on save
    note right of browser :javascript add the note to the note list
    note right of browser : javascript re renders the notes on the page
    browser -->> server :  POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser:{"content": "hello js","date": "2026-06-26T11:54:08.910Z"}
    server -->> browser : {"message": "note created"}
    note right of browser:no page reload
```