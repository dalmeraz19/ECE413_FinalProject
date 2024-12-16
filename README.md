# ECE 513 Project: Heart Track, an IoT-enabled Heart Rate Monitoring Application

## Overview
The **Heart Track** project is a low-cost, IoT-enabled web application for monitoring heart rate and blood oxygen saturation levels. It is designed to help users track their health metrics conveniently and share them with physicians (ECE 513). The project includes both hardware and software components, integrating IoT devices with a responsive web application.

GitHub Repo Link: https://github.com/dalmeraz19/ECE413_FinalProject/

---

## Features
### IoT Device
- Measures heart rate and blood oxygen saturation.
- Flashes a blue LED to request user measurements periodically.
- Stores data locally if offline and syncs when online.
- Configurable measurement frequency and time range.

### Web Application
- Responsive design for desktop, tablet, and mobile.
- User account creation, device registration, and management.
- Weekly summary view (average, min, max metrics).
- Detailed daily view with visualized heart rate and blood oxygen readings.
- RESTful API with token-based authentication.

### Additional Features for ECE 513
- Physician portal for patient management.
- HTTPS server implementation.

---

## Requirements
### Hardware
- IoT Development Board: [Photon](https://store.particle.io/products/photon-2) or [Argon](https://store.particle.io/products/argon-kit).
- Heart Rate Sensor (MAX30102): [Link](https://www.amazon.com/dp/B08NFY97SC).
- Micro USB cable, mini breadboard, jumper wires.

### Software
- Backend: Node.js, Express, MongoDB.
- Frontend: HTML, CSS, JavaScript (responsive design).
- IoT: Firmware with synchronous state machines.
- API Documentation: RESTful endpoints.

---

## Installation
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd HeartTrack
   ```
2. **Install dependencies:**
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
   source ~/.nvm/nvm.sh
   nvm install 20.18.0
   npm install 
   ```
   -Install Node.js v20.18.0 https://nodejs.org/en/about/previous-releases
   -Install MongoDB version 8.0 https://www.mongodb.com/try/download/community

3. **Run the server:**
   ```bash
   npm start
   ```
4. **Configure IoT device:**
   - Upload the provided firmware code to the IoT development board.
   - Connect the device to Wi-Fi.

5. **Access the application:**
   - Open a browser and navigate to `http://localhost:3000`.

---

## Usage
1. **Create an account:** Register using an email and strong password.
2. **Add devices:** Link IoT devices to your account.
3. **Configure measurements:** Define time range and frequency.
4. **View data:** Access weekly summaries and daily charts.
5. **(ECE 513)** Physician portal for patient data management.

---

## Demonstration
- **Pitch Video:** https://youtu.be/n5SJ6ec5CUA
- **Demo Video:** [Link to Demo Video](#)
- **Live Application:** https://ec2-18-117-93-208.us-east-2.compute.amazonaws.com:3000/index.html
- **Link to Project Documentation:** https://docs.google.com/document/d/10KJNrva9BkfLw2xYAokBrQBhJ5N6SN6JLQeajrAmHno/edit?usp=sharing

---

## Project Team
- Malcolm Hayes
- Dalian Meraz
- Anand Ramaswamy
- Reshma Yarlagadda
