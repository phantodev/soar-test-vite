# SOAR Financial Dashboard

## 📊 Project Overview

SOAR Financial Dashboard is a comprehensive financial management application built with React, TypeScript, and modern web technologies. This responsive web application provides users with an intuitive interface to monitor their financial activities, manage card details, track transactions, and visualize spending patterns through interactive charts and statistics.

### 🌟 Live Demo

[View Live Demo](https://soar-test-vite.vercel.app/)

### User

- Email: `soar@soar.com`
- Password: `hire-me`

PS: You can test the login with the other credentials to check ERROR HANDLE STATE.

## ✨ Features

### Dashboard Page
- **My Cards Section**: View and manage multiple card details with balance information and masked card numbers
- **Recent Transactions**: Track incoming and outgoing transactions with detailed descriptions
- **Weekly Activity Chart**: Visualize daily deposit and withdrawal activities
- **Expense Statistics**: Breakdown of expenses by category using interactive pie charts
- **Quick Transfer**: Easily transfer funds to frequent contacts (UI implementation)
- **Balance History**: Track balance trends over time with interactive line charts

### Settings Page
- **Profile Management**: Edit personal information including name, email, and address
- **Preferences**: Customize application settings
- **Security**: Manage account security settings
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices

## 🛠️ Technologies Used

- **Frontend Framework**: React with TypeScript
- **State Management**: Zustand for efficient and simple state handling
- **Styling**: TailwindCSS with HeroUI components
- **UI Components**: Custom accessible components
- **Charts**: Chart.js for data visualization
- **Routing**: React Router for seamless navigation
- **Form Handling**: Custom form validation with accessibility support
- **Animations**: Framer Motion for smooth transitions

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktops (1024px and up)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
```bash
git clone https://github.com/phantodev/soar-test-vite
cd soar-test-vite
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🧪 Testing

The project uses a comprehensive testing approach to ensure code quality and reliability:

### Unit and Integration Tests

We use **Vitest** as the testing framework for React components, custom hooks, and services:

```bash
# Run all unit and integration tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### End-to-End (E2E) Tests

We use **Playwright** for E2E tests that simulate real user interactions across different browsers:

```bash
# Install browsers for Playwright
pnpm exec playwright install

# Run E2E tests
pnpm test:e2e

# Run E2E tests in UI mode
pnpm test:e2e:ui
```

### Test Structure

- `src/__tests__/`: Unit and integration tests
  - `components/`: Tests for React components
  - `hooks/`: Tests for custom hooks
  - `pages/`: Tests for complete pages
  - `services/`: Tests for services and APIs
- `e2e/`: End-to-end tests with Playwright

## 🏗️ Build for Production

```bash
npm run build
```

## 🌐 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## ♿ Accessibility

This project follows WCAG 2.1 guidelines to ensure accessibility for all users:
- Proper semantic HTML structure
- ARIA attributes where necessary
- Keyboard navigation support (including custom tab navigation)
- Focus management for interactive elements
- Color contrast compliance

## 📝 Development Approach

### Architecture
The application follows a component-based architecture with clear separation of concerns:
- **Components**: Reusable UI elements
- **Pages**: Main application views
- **Hooks**: Custom React hooks for shared logic
- **Store**: State management with Zustand
- **Utils**: Helper functions and utilities

### Performance Optimizations
- Code splitting for faster initial load
- Lazy loading of non-critical components
- Memoization of expensive calculations
- Optimized asset loading

### Technical Challenges Solved
- Implemented custom keyboard navigation between form elements
- Created responsive charts that adapt to different screen sizes
- Built accessible form components with proper validation
- Designed a responsive layout that works across all device sizes

## 🔍 Future Enhancements

- Dark mode support
- Multi-language support
- Push notifications
- Transaction categorization with AI
- Budget planning features

## 👨‍💻 Developer

Developed with ❤️ by Eduardo Burko - Phantodev

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## Setup Notes

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@heroui/*
```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.
