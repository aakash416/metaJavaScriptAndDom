# Personal Portfolio

A dynamic portfolio website built using JavaScript, HTML, and CSS. The application fetches external JSON data, dynamically updates the DOM, handles missing API data gracefully, and includes client-side form validation.

## Features

### About Me Section
- Fetches profile data from JSON
- Dynamically renders bio information
- Displays profile headshot

### Projects Section
- Fetches project data from JSON
- Dynamically generates project cards
- Updates project spotlight on card selection
- Handles missing project data with fallback content
- Responsive scrolling navigation using JavaScript
- Supports both mobile (horizontal scroll) and desktop (vertical scroll)

### Contact Form Validation
- Email validation
- Message validation
- Illegal character detection
- Maximum message length validation (300 characters)
- Live character counter
- Error messages for invalid inputs

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- DOM Manipulation
- Fetch API
- Event Listeners
- Regular Expressions

## Project Structure

```text
├── css
│   ├── normalize.css
│   └── styles.css
├── data
│   ├── aboutMeData.json
│   └── projectsData.json
├── images
├── js
│   └── scripts.js
└── index.html
```

## Installation

1. Clone the repository

```bash
git clone <repository-url>
```

2. Open the project folder

```bash
cd personal-portfolio
```

3. Run using Live Server in VS Code

or

Open `index.html` directly in your browser.

## Author

**Aakash Raj**

- GitHub: https://github.com/aakash416
- LinkedIn: https://www.linkedin.com/in/aakashraj416/