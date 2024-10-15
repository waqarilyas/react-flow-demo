# Company Hierarchy Management Tool

This is a **Next.js** application built with the **App Router** and **React Flow**. It provides an interactive tool to visualize and manage the hierarchical relationships within a company, including features such as:

- Multiple node connections to represent hierarchical relationships between different positions.
- Dynamic updates to both the graphical layout (React Flow) and a synchronized table of designations, descriptions, and titles.
- Ability to add new nodes (positions) dynamically and connect them to existing nodes.
- Table synchronization: as you update the hierarchical information in the table, the changes are reflected in the node graph, and vice versa.
- Simple interface to add or delete nodes and maintain connections between them.

## Features

### 1. Visualize Company Hierarchy

The application uses **React Flow** to display different positions and individuals within a company structure as nodes. Users can view and edit the following:

- **Designation** (e.g., CEO, Director)
- **Next Designations** (designations to which the node is connected)
- **Description** (description of the role)
- **Title** (name of the person holding the designation)

### 2. Dynamic Node and Edge Management

- **Add Nodes:** Users can dynamically add new roles/positions and connect them to the existing hierarchy.
- **Connect Nodes:** Establish relationships by connecting nodes through edges, which update the table and the hierarchy data.
- **Delete Nodes:** Deleting a node will automatically remove its associated edges and update the table data.

### 3. Table Synchronization

The application includes a synchronized table where you can modify the following data:

- **Designation:** The role or position within the hierarchy.
- **Next Designations:** The positions or designations to which this node is connected.
- **Description:** A brief description of the role or responsibilities.
- **Title:** The name of the individual holding the role.

Changes in the table are automatically reflected in the visual hierarchy.

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

### Prerequisites

- Node.js (v16+)
- Next.js (v13+)
- React Flow (v10+)

### Usage

1. The hierarchical chart is interactive. You can click the "Add Node" button to create a new node within the hierarchy.
2. Nodes can be dragged and repositioned.
3. To connect nodes, simply drag from one node to another, which will create a directional edge between them.
4. Update node data (designation, next designations, description, and title) directly within the table. Changes will be reflected both in the visual graph and in the underlying data.

## Customization

You can easily extend the functionality by:

- Adding additional fields to the hierarchy data (e.g., departments, team size).
- Implementing different node types (input, default, output).
- Adding user authentication and role-based access control to manage who can view or edit the hierarchy.

## Dependencies

- **Next.js**: Framework for server-side rendering and routing.
- **React Flow**: Library for creating interactive node-based UIs and visualizations.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](#) if you have any ideas or feedback.

## License

This project is licensed under the MIT License.

---

Feel free to modify and expand this README as per your project's evolution.
