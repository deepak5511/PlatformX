# Project Workflow: PlatformX Trading Simulation

This document outlines the key functionalities and user flows within the PlatformX Trading Simulation application. It covers both the Facilitator and Participant perspectives, detailing how users interact with the system from login to post-simulation analysis.

## 1. Facilitator Workflow

The facilitator is responsible for setting up and managing trading simulations. Their workflow involves:

### 1.1. Login and Dashboard Access
- **Login (A):** Facilitators log in using their credentials (e.g., `admin@platformx.com` / `password123`).
- **Facilitator Dashboard (B):** Upon successful login, the facilitator is directed to a dashboard providing an overview of ongoing and past simulations, and options to manage new ones.

### 1.2. Scenario Setup
- **Create Scenario (C):** From the dashboard, facilitators can initiate the creation of a new trading scenario.
- **Enter Scenario Prompt (D):** They define the scenario by providing a title, description, and potentially other parameters like market conditions or specific events.
- **Valid Prompt? (E):** The system validates the entered information. If invalid, an error is displayed (F), and the facilitator is prompted to correct it.
- **Preview Scenario (G):** Before saving, the facilitator can preview the scenario to ensure it meets their requirements.
- **Save Scenario (H):** Once satisfied, the scenario is saved and becomes available for simulations.

### 1.3. Simulation Control
- **Start Simulation (I):** From the dashboard, the facilitator can select a saved scenario and start a new simulation.
- **Simulation Active (J):** The simulation begins, and the system transitions to a monitoring interface.
- **Facilitator: Monitor (K):** During an active simulation, the facilitator can monitor various aspects:
    - **View Live Trades (L):** Observe real-time trading activity from participants.
    - **View Analytics Dashboard (M):** Access a dashboard providing live analytics and performance metrics of the simulation.
- **End Simulation (N):** The facilitator can end the simulation at any time.

### 1.4. Post-Simulation Analysis
- **Simulation Ended (O):** After the simulation concludes, the facilitator is presented with a summary.
- **Facilitator: Review Analytics (P):** They can review comprehensive analytics of the simulation, including overall performance, participant rankings, and other key metrics.
- **Export Trade Data (Q):** Option to export all trade data for further external analysis.

## 2. Participant Workflow

Participants engage in the trading simulation based on the scenarios set by the facilitator. Their workflow focuses on trading and performance monitoring.

### 2.1. Login and Trading Interface
- **Participant Log In (R):** Participants log in using their unique credentials (e.g., `participant001` / `password123`).
- **Trading Interface (S):** Upon successful login, participants are directed to their trading interface.
- **View Scenario & Market Prices (T):** The interface displays the current scenario details and real-time market data for various assets.

### 2.2. Trade Execution
- **Execute Trades (U):** Participants can place buy or sell orders for available assets.
- **Trade Valid? (V):** The system validates the trade (e.g., sufficient funds, valid quantity). If invalid, an error is shown (W), and the participant is prompted to correct it.
- **Update Position/P&L (X):** Upon a valid trade, the participant's portfolio, positions, and Profit & Loss (P&L) are updated in real-time.

### 2.3. Performance Monitoring
- **Monitor Performance (Y):** Participants can continuously monitor their trading performance.
- **Real-time P&L (Z):** View their current P&L and portfolio value.
- **Live Leaderboard (AA):** See their ranking against other participants in real-time.

### 2.4. Post-Simulation Results
- **Participant: View Results (BB):** After the simulation ends, participants can view their individual results.
- **Final Ranking (CC):** See their final position in the leaderboard.
- **Earned Badges (DD):** View any badges or achievements earned during the simulation.

## 3. Technical Overview

The application is built using modern web technologies, primarily:
- **Frontend:** React with Vite for fast development and optimized builds.
- **Styling:** Tailwind CSS for utility-first styling.
- **UI Components:** Radix UI for accessible and customizable UI primitives.
- **State Management:** React hooks for managing component state.
- **Routing:** React Router DOM for navigation.
- **Charting:** Recharts for data visualization (e.g., in Analytics Dashboard).

## 4. Integration of UI Components

Recent updates have integrated new UI components for Live Trades and Analytics Dashboard, enhancing the real-time monitoring capabilities for facilitators. Error handling components have also been integrated to provide clearer feedback to users during trade execution.

This document provides a high-level overview of the PlatformX Trading Simulation. For detailed implementation, please refer to the source code.

