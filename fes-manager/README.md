# FES-Manager

FES-Manager is a platform designed to connect donors with impactful educational and community projects. 
It provides transparency in funding, allowing donors to support specific projects, monitor progress, and ensure proper fund distribution.

## Features

### 1. Donor & Philanthropy Management  
- Individual, Organization, or Government Donors can create accounts.
- Project-Based Funding: Donors can fund entire projects or specific tasks within a project.
- Impact Tracking: Donors receive real-time updates on projects they support.

### 2. Project Management  
- Organizers can submit projects for funding.
- Task-Based Donations: Each project is broken into tasks, enabling donors to sponsor individual aspects.
- Automated Fund Allocation: Funds are not sent to project organizers but rather to verified schools, 
  organizations, or implementing bodies.

### 3. Transparency & Verification  
- Project Verification: Requires official documents (invoices, agreements).
- Real-Time Updates: Fund usage is automatically tracked in the project dashboard.
- Donors can view project impact reports.

### 4. Community Support & School Fees Funding  
- Educational Support: Fund tuition fees by paying directly to verified schools.
- Community Projects: Infrastructure and welfare-based projects available for sponsorship.

## Tech Stack  
- **Frontend:** Vite + React.js + Zustand (state management) + TailwindCSS  
- **State Management:** Zustand  
- **Form Handling:** Multi-step forms with validation and local storage  
- **UI Effects:** Fully responsive with Tailwind animations  

## Setup Instructions

### 1. Clone the Repository  

git clone https://github.com/your-username/fes-manager.git  

cd fes-manager

### 2. Install Dependencies  

npm install  


### 3. Start the Development Server  

npm run dev  

## Project Structure

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


## Contributing  
We welcome contributions! To contribute:  
1. Fork the repository  
2. Create a feature branch (`git checkout -b feature-name`)  
3. Commit changes (`git commit -m "Added feature X"`)  
4. Push to your branch (`git push origin feature-name`)  
5. Create a Pull Request  

## License  
This project is licensed under the MIT License.

FES-Manager is designed to ensure fair, transparent, and impactful giving!
