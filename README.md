# 🌍 FES-Manager

> _“The Riverbank that shapes and guides movement—offering direction and flow in the world of philanthropy.”_  
> — Abraham Bortey Danfa, Founder

---

## About FES-Manager

![MIT License](https://img.shields.io/badge/License-MIT-green.svg)
![React](https://img.shields.io/badge/Frontend-React-61DAFB.svg?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Styled%20With-TailwindCSS-38B2AC.svg?logo=tailwindcss)
![Zustand](https://img.shields.io/badge/State-Zustand-4B3263?logo=Zustand)
![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite)

**FES-Manager** is a platform designed to connect donors with impactful educational and community projects. It provides full transparency in funding, allowing donors to support specific projects, monitor progress, and ensure proper fund distribution.

It is a tech-driven financial and educational support management system that bridges the gap between **donors** and **beneficiaries**, making philanthropy data-driven, verifiable, and genuinely impactful.

---

## Core Features

### Donor & Philanthropy Management

- Individual, Organization, or Government Donors can create accounts.
- Project-Based Funding: Donors can fund entire projects or specific tasks within a project.
- Real-Time Impact Tracking: Donors receive detailed updates, progress snapshots, and receipts.
- Anonymous Donations with Verifiable Audit Trails

### Project Management

- Organizers can submit and manage projects through multi-step forms.
- Task-Based Donations: Projects are broken into units for flexible sponsorship.
- Automated Fund Allocation: Funds are sent to verified schools or bodies—not directly to individuals.

### Transparency & Verification

- Project Verification: Requires uploads like invoices, school letters, agreements, etc.
- Real-Time Dashboard: Track how much has been received, spent, and the outcomes.
- Donors and stakeholders can view reports and usage breakdowns anytime.

### Community & School Funding

- Direct Tuition Support: Pay school fees directly to verified institutions.
- Community Projects: Fund infrastructure, learning programs, or public welfare efforts.
- One-Way Communication: Managed by the FES-Manager admin only.

---

## Tech Stack

- **Frontend:** Vite + React.js + Zustand + TailwindCSS
- **State Management:** Zustand
- **Form Handling:** Multi-step forms with step validation, autosave, and local storage
- **Responsive Design:** Tailwind with mobile-first responsiveness and animations

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Abraham-trigs/FES-Manager.git
cd fes-manager
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

---

## Project Structure

```
/src
 ├── components/               # Reusable UI components
 │   ├── Project/
 │   │   ├── ProjectCard.jsx       # Displays project details
 │   │   ├── ProjectListPage.jsx   # Lists all projects
 │   │   ├── AddProjectForm.jsx    # Multi-step form for adding a project
 │   │
 │   ├── Layout/
 │   │   ├── SideBar.jsx           # Sidebar navigation
 │   │   ├── Footer.jsx            # Footer component
 │   │
 │   ├── Signup/
 │   │   ├── SignupForm.jsx        # Main signup form
 │   │   ├── StepOne.jsx           # Step 1 of signup
 │   │   ├── StepTwo.jsx           # Step 2 of signup
 │   │   └── StepThree.jsx         # Step 3 of signup
 │
 ├── store/                    # Zustand state management
 │   ├── projectStore.js         # Zustand store for projects
 │   ├── projectFormStore.js     # Zustand store for project form state
 │   ├── signupStore.js          # Zustand store for user signup
 │
 ├── App.jsx                    # Main app entry
 ├── main.jsx                   # React/Vite entry point
 ├── index.css                  # Global styles
 ├── assets/                    # Static assets (e.g., images, logos)
 │   ├── fes-logo.svg           # FES-Manager logo
 │   ├── icons/                 # SVGs, icons
 │   └── images/                # Other images
 │
 ├── utils/                     # Utility functions/helpers
 │   ├── formatDate.js          # Function to format dates
 │   ├── calculateDonation.js   # Function for donation calculations
 │   └── api.js                 # API requests (if applicable)
 │
 └── hooks/                     # Custom hooks
     ├── useAuth.js             # Hook for authentication
     ├── useFetch.js            # Hook for fetching data
```

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Added feature X"`)
4. Push to your branch (`git push origin feature-name`)
5. Create a Pull Request

---

## License

This project is licensed under the MIT License. See the LICENSE file for more info.

---

## Final Note

> _What if your smallest coin could create the biggest ripple?_

> FES-Manager turns good intentions into trackable, real-world change. Join us—and let’s reshape the future of support, transparency, and accountabilty to promote trust in the world of philantropy and Humaniterian activities.
