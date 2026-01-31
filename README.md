# ✈️ SpotterFlights - Flight Search Engine
[🔗 Live Demo](https://flight-search-engine-sandy.vercel.app/)

A modern, responsive flight search application built with React and powered by the Amadeus API. Features real-time flight data, interactive price visualization, and advanced filtering capabilities.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwindcss)
![Amadeus API](https://img.shields.io/badge/Amadeus-Flight_API-1B69B6)

---

##  Features

- **Real-time Flight Search** - Search flights using the Amadeus API test environment
- **Interactive Price Chart** - Visualize price comparisons across airlines with Recharts
- **Advanced Filtering** - Filter by price, stops, departure time, and airlines
- **Sorting Options** - Sort results by price, duration, or departure time
- **Popular Airlines** - Quick filter pills with airline logos
- **Responsive Design** - Fully responsive UI built with Tailwind CSS
- **Loading States** - Skeleton loaders and smooth transitions
- **Toast Notifications** - User feedback for search actions and errors
- **Trip Type Support** - One-way and round-trip searches
- **Traveler Selection** - Adults, children, and infants support
- **Cabin Class** - Economy, Premium Economy, Business, and First class

---

##  Tech Stack

| Category             | Technology                              |
| -------------------- | --------------------------------------- |
| **Framework**        | React 19.2 with Vite                    |
| **Styling**          | Tailwind CSS v4                         |
| **Charts**           | Recharts                                |
| **HTTP Client**      | Axios                                   |
| **Icons**            | Lucide React                            |
| **State Management** | React Hooks (useState, useMemo, useRef) |
| **API**              | Amadeus Flight Offers Search API        |

---

## 📁 Project Structure

```
flight-search-engine/
├── public/
│   ├── airplane.svg          # Favicon
│   └── logos/                 # Airline logo images (.webp)
│       ├── JetBlue.webp
│       ├── American-Airline.webp
│       ├── Emirates.webp
│       └── ... (21 airline logos)
│
├── src/
│   ├── assets/                # Static assets
│   │
│   ├── components/
│   │   ├── charts/
│   │   │   └── PriceTrendChart.jsx    # Price comparison line chart
│   │   │
│   │   ├── filters/
│   │   │   └── FiltersPanel.jsx       # Sidebar filters (price, stops, time, airlines)
│   │   │
│   │   ├── layout/
│   │   │   └── Header.jsx             # App header with logo & account dropdown
│   │   │
│   │   ├── results/
│   │   │   ├── FlightCard.jsx         # Individual flight result card
│   │   │   ├── FlightResults.jsx      # Flight results container with states
│   │   │   └── SortDropdown.jsx       # Sort options dropdown
│   │   │
│   │   ├── search/
│   │   │   ├── CabinClassDropdown.jsx # Cabin class selector
│   │   │   ├── PopularAirlines.jsx    # Airline filter pills (compact & full)
│   │   │   ├── SearchForm.jsx         # Main search form with inputs
│   │   │   ├── SearchSection.jsx      # Search section wrapper
│   │   │   ├── TravelersDropdown.jsx  # Travelers count selector
│   │   │   └── TripTypeDropdown.jsx   # Trip type selector
│   │   │
│   │   └── ui/
│   │       ├── EmptyState.jsx         # Empty/error state components
│   │       ├── LoadingSkeleton.jsx    # Loading skeleton components
│   │       └── Toast.jsx              # Toast notification components
│   │
│   ├── data/
│   │   └── mockData.js                # Mock data for development
│   │
│   ├── hooks/
│   │   └── useToast.js                # Toast notification hook
│   │
│   ├── services/
│   │   └── amadeus.js                 # Amadeus API service (auth & search)
│   │
│   ├── App.jsx                        # Main application component
│   ├── App.css                        # App-specific styles
│   ├── index.css                      # Global styles & Tailwind imports
│   └── main.jsx                       # React entry point
│
├── .env                               # Environment variables (API keys)
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Amadeus API credentials ([Get them here](https://developers.amadeus.com/))

### 1. Clone the repository

```bash
git clone https://github.com/David-Samson401/flight-search-engine.git
cd flight-search-engine
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
VITE_AMADEUS_API_KEY=your_api_key_here
VITE_AMADEUS_API_SECRET=your_api_secret_here
```

### 4. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

##  Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

---

##  API Integration

This app uses the **Amadeus Flight Offers Search API** (test environment).

### Endpoints Used:

- `POST /v1/security/oauth2/token` - OAuth2 authentication
- `GET /v2/shopping/flight-offers` - Search flight offers

### Search Parameters:

- Origin & destination (IATA codes)
- Departure date (and return date for round trips)
- Number of travelers (adults, children, infants)
- Cabin class
- Maximum results (default: 50)

### Response Transformation:

The API response is transformed to include:

- Airline name and logo mapping
- Formatted departure/arrival times
- Duration in human-readable format
- Stop count and type
- Price per person

---

##  UI Components

### Core Components

- **SearchSection** - Complete search form with trip type, travelers, cabin class
- **FiltersPanel** - Sidebar with price slider, stops, departure time, airlines
- **FlightResults** - Results list with loading, empty, and error states
- **FlightCard** - Expandable card with flight details, badges, and booking button
- **PriceTrendChart** - Interactive line chart comparing airline prices

### UI Utilities

- **Toast** - Success, error, warning, info notifications
- **LoadingSkeleton** - Animated loading placeholders
- **EmptyState** - Initial, no-results, and error states

---

##  Security Note

 **Important**: This is a frontend-only application. API keys with `VITE_` prefix are exposed in the browser bundle.

**For production deployment**, you should:

1. Create a backend server (Node.js/Express)
2. Move Amadeus API calls to the backend
3. Keep API credentials server-side only
4. Have the frontend call your backend API

---

##  Responsive Design

The app is fully responsive with breakpoints:

- **Mobile**: Single column layout
- **Tablet**: Adjusted grid, collapsible filters
- **Desktop**: Full 12-column grid with sidebar

---

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


---

##  Author

Built with ❤️ using React, Tailwind CSS, and the Amadeus API.

---

## Acknowledgments

- [Amadeus for Developers](https://developers.amadeus.com/) - Flight data API
- [Recharts](https://recharts.org/) - Charting library
- [Lucide](https://lucide.dev/) - Icon library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
