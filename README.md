# Cryptocurrency Tracker

## 1. Project Overview
Crypto Tracker is a React-based web application designed to provide users with real-time cryptocurrency data, news, and personalized price alerts. It offers a user-friendly interface to explore trending coins, search for cryptocurrencies, manage favorites, and stay updated with the latest crypto news. The app integrates user authentication and supports notifications for price alerts.
![image alt]()
## 2. Features and Functionality

### 2.1 User Authentication
- Utilizes Clerk for secure user authentication and session management.
- Ensures personalized experience with user-specific favorites and alerts.

### 2.2 Tabbed Interface
- **Trending:** Displays a curated list of trending cryptocurrencies with ranking.
- **Cryptocurrencies:** Shows a comprehensive list of coins with detailed info such as current price, market cap, and price changes.
- **Search:** Allows users to search for coins by name or symbol.
- **Favourites:** Users can add/remove coins to their favorites list for quick access.
- **Crypto News:** Aggregates and displays the latest news articles related to cryptocurrencies.

### 2.3 Price Alerts
- Users can create alerts specifying:
  - Coin ID and Name
  - Target Price
  - Direction (Above or Below)
- Alerts trigger browser notifications or alert popups when conditions are met.
- Alerts can be toggled active/inactive or removed.
- Alerts are persisted in localStorage for persistence across sessions.

### 2.4 Data Management
- Uses React Query for efficient data fetching, caching, and background updates.
- Coin data and news are refreshed every 5 minutes.
- Global state management via React Context API for coins, favorites, and price alerts.

### 2.5 Favorites Management
- Users can mark coins as favorites by clicking a heart icon.
- Favorites are managed globally and displayed in a dedicated tab.

### 2.6 Responsive and Accessible UI
- Built with Headless UI Tabs for accessible keyboard navigation.
- Supports dark mode and responsive layouts for various screen sizes.
- Uses Tailwind CSS for styling.

## 3. Architecture and Technology Stack
- **Frontend:** React with TypeScript
- **State Management:** React Context API
- **Data Fetching:** React Query (@tanstack/react-query)
- **Authentication:** Clerk React SDK
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS, Headless UI
- **Notifications:** Web Notifications API
- **Persistence:** localStorage for price alerts

## 4. Context Providers and State Management
- **CoinProvider:** Manages fetching and providing coin data globally.
- **FavoritesProvider:** Manages user's favorite coins.
- **PriceAlertProvider:** Manages price alerts, including adding, removing, toggling, and triggering notifications.

## 5. Component Structure and Responsibilities
- **App.tsx:** Main app component, sets up routing, layout, and tab navigation.
- **MenuTabs.tsx:** Defines the tab labels for navigation.
- **MenuPanels.tsx:** Renders content for each tab (Trending, Cryptocurrencies, Search, Favourites, News).
- **CoinCard.tsx:** Displays individual coin details.
- **TrendingCoinCard.tsx:** Displays trending coin with ranking.
- **SearchCoinList.tsx:** Search interface for coins.
- **NewsList.tsx:** Displays crypto news articles.
- **PriceAlertForm.tsx:** Form to create new price alerts.
- **PriceAlertList.tsx:** Lists existing price alerts with controls.
- **Layout.tsx:** General page layout including header/footer.

## 6. Data Fetching and Caching Strategy
- React Query is configured with a 5-minute refetch interval.
- Coin data and news are fetched from external APIs (not detailed here).
- Data is cached and updated in the background for smooth UX.

## 7. Notification and Alert System
- Price alerts are checked against current coin prices.
- When alert conditions are met, browser notifications are triggered if permission is granted.
- Alerts are marked inactive after triggering to avoid repeated notifications.
- Fallback alert popups are used if notifications are not permitted.

## 8. Authentication Flow
- Clerk handles user sign-in, sign-up, and session management.
- Authentication state is checked before rendering the main app.
- User-specific data like favorites and alerts are scoped to authenticated users.

## 9. Styling and UI Framework
- Tailwind CSS provides utility-first styling.
- Headless UI Tabs ensure accessible tab navigation.
- Dark mode support is included.
- Responsive design adapts to different screen sizes.

## 10. Running and Testing the Project
- Install dependencies: `npm install`
- Start development server: `npm run dev`
- Access app at `http://localhost:5174` (or assigned port)
- Test all tabs, price alert creation and notifications, authentication flows, and favorites management.
- Ensure notifications permissions are granted for alerts.

## 11. Possible Extensions and Notes
- Add more detailed coin analytics and charts.
- Support for multiple alert types (volume, market cap).
- User profile and settings management.
- Integration with additional news sources.
- Improved error handling and loading states.

## Licence

This is an open-source project and is available under the [**MIT License**](LICENSE). You are free to use, modify, and distribute the code in accordance with the terms of the license.

## Contributors

Contributions are highly appreciated! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

[JJTK780](https://github.com/JJTK780) & [drupathmm](https://github.com/drupathmm)

## Contact

GitHub:

- [JJTK780](https://github.com/JJTK780)
- [drupathmm](https://github.com/drupathmm)

LinkedIn profile: (https://www.linkedin.com/in/jefsonjacob)
