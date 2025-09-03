export type Template = {
  name: string;
  code: string;
};

export const templates: readonly Template[] = [
  {
    name: "Flowchart",
    code: `flowchart TD
    A[Christmas] --> B(Go shopping)
    B --> C{Let me think}
    C --> |One| D[Laptop]
    C --> |Two| E[iPhone]
    C --> |Three| F[fa:fa-car Car]
    C --> |Four| G[Something else]`,
  },
  {
    name: "Sequence Diagram",
    code: `sequenceDiagram
    participant User
    participant System
    participant Database
    
    User->>System: Request data
    System->>Database: Query
    Database-->>System: Return results
    System-->>User: Display data`,
  },
  {
    name: "Class Diagram",
    code: `classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    class Cat {
        +String color
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat`,
  },
  {
    name: "Gantt Chart",
    code: `gantt
    title Project Schedule
    dateFormat  YYYY-MM-DD
    section Planning
    Define Requirements     :a1, 2023-06-01, 15d
    Design                  :a2, after a1, 20d
    section Development
    Code                    :a3, after a2, 30d
    Test                    :a4, after a3, 15d
    section Deployment
    Deploy                  :a5, after a4, 5d
    Feedback                :a6, after a5, 10d`,
  },
  {
    name: "Entity Relationship",
    code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses`,
  },
  {
    name: "State Diagram",
    code: `stateDiagram-v2
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]`,
  },
  {
    name: "Pie Chart",
    code: `pie title Product Usage
    "Chrome" : 42.7
    "Firefox" : 30.2
    "Edge" : 15.5
    "Safari" : 9.8
    "Others" : 1.8`,
  },
  {
    name: "User Journey",
    code: `journey
    title User Journey for Flow2Chat
    section Discovery
      Find Extension: 5: User
      Read Reviews: 3: User
    section Installation
      Install Extension: 5: User
      Initial Setup: 3: User, System
    section Usage
      Create Diagram: 5: User, System
      View Results: 5: User`,
  },
] as const;

