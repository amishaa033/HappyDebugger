# HappyDebugger - Online Code Editor & Execution Platform

HappyDebugger is a modern, full-featured online code editor and execution platform that allows users to write, test, and run code in multiple programming languages. With its powerful Monaco editor integration and real-time code execution capabilities, it provides a seamless environment for coding and debugging.

## Features

1. **Advanced Code Editor**
   - Monaco Editor Integration (VS Code-like experience)
   - Multiple Theme Support (Dark, Light, High Contrast, Solarized Dark, Dracula)
   - Syntax highlighting for multiple languages
   - Custom code formatting
   - Code persistence across sessions
   - Code download functionality

2. **Multi-Language Support**
   - C/C++ with standard library support
   - Java with JDK 15.0.2
   - Python 3.10.0
   - JavaScript (Node.js 18.15.0)
   - Full language-specific features and syntax highlighting

3. **Code Execution Engine**
   - Real-time code compilation and execution
   - Integrated Piston API support
   - Custom input capabilities
   - Detailed output display
   - Error handling and display
   - Execution state management

4. **User Interface Features**
   - Split-pane layout for code and output
   - Custom input section for program testing
   - Real-time execution status
   - Modern, responsive design
   - Beautiful gradient themes and animations
   - Intuitive navigation system

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/amishaa033/HappyDebugger.git
cd p1
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── assets/         # Static assets (images, icons)
├── pages/          # Application pages and routes
│   ├── homepage.jsx        # Landing page
│   ├── aboutus.jsx        # About section
│   ├── contactus.jsx      # Contact form
│   └── secondpage/        # Code playground components
│       ├── playground.jsx # Main code editor container
│       ├── codeditor.jsx # Monaco editor integration
│       ├── input.jsx     # Code input handling
│       ├── output.jsx    # Output display
│       └── navbar.jsx    # Navigation component
└── output.css     # Compiled Tailwind styles
```

## Technology Stack

### Frontend Framework
- React.js 19.1.0 - Core UI framework
- Vite 6.3.5 - Build tool and development server
- React Router 7.6.0 - Application routing

### Code Editor Integration
- Monaco Editor - VS Code's editor component
- Language Support:
  - C/C++ with GCC 10.2.0
  - Java with OpenJDK 15.0.2
  - Python 3.10.0
  - Node.js 18.15.0

### Code Execution
- Piston API Integration
  - Secure code execution
  - Multiple runtime support
  - Input/Output handling
  - Error management

### UI Framework
- Tailwind CSS 4.1.7 - Styling and layout
- FontAwesome - Icons and visual elements
- Custom animations and transitions

### Developer Tools
- ESLint - Code linting and standards
- Local Storage - Code persistence
- Development scripts for build and deployment

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run tailwindcss` - Watch and compile Tailwind CSS
- `npm start` - Run development server with Tailwind CSS compilation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.



## Contact

For any queries or support, please visit the About Us or Contact Us section of the application.
