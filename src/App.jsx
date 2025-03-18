import { useState } from 'react'
import Index from './Index';
import ApplicantsTable from './ApplicantsTable';
import ApplicationForm from './ApplicationForm';
import Navbar from './Navbar';
import './App.css'
import MoreDetails from './MoreDetails';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FranchiseLogin from './FranchiseLogin';
import ProtectedRoute from './components/ProtectedRoute';
import FranchiseDashboard from './FranchiseDashboard';
import FranchiseSales from './FranchiseSales';
import FranchiseSalesHistory from './FranchiseSalesHistory';
import FranchiseCharts from './FranchiseCharts';
import FranchiseSettings from './FranchiseSettings';


function App() {

  return (
    // <>
    //   <BrowserRouter>
    //     <Routes>
    //       {/* Admin Routers  */}
    //       <Route path='/applicantsTable' element={<ApplicantsTable></ApplicantsTable>}></Route>
    //       <Route path='/moreDetails/:emailid' element={<MoreDetails></MoreDetails>}
    //       ></Route>
    //       {/* Franchise Routers  */}
    //       <Route path='/franchise/login' element={<FranchiseLogin></FranchiseLogin>}></Route>

    //       {/* Protected Route for Franchise  */}
    //       <Route path="/franchiseDashboard" element={<ProtectedRoute><FranchiseDashboard></FranchiseDashboard></ProtectedRoute>}>
    //         <Route index element={<FranchiseCharts />} />
    //         <Route path="charts" element={<FranchiseCharts />} />
    //         <Route path="sales" element={<FranchiseSales />} />
    //         <Route path="history" element={<FranchiseSalesHistory />} />
    //         <Route path="charts" element={<FranchiseCharts />} />
    //         <Route path="settings" element={<FranchiseSettings />} />
    //       </Route>


    //     </Routes>
    //   </BrowserRouter>
    // </>
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar/>
        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index></Index>} />
            <Route path="/applicationform" element={<ApplicationForm />} />
            <Route path="/franchise/login" element={<FranchiseLogin />} />

            {/* Admin Routes */}
            <Route path="/applicantsTable" element={<ApplicantsTable />} />
            <Route path="/moreDetails/:emailid" element={<MoreDetails />} />

            {/* Protected Franchise Routes */}
            <Route
              path="/franchiseDashboard"
              element={
                <ProtectedRoute>
                  <FranchiseDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<FranchiseCharts />} />
              <Route path="charts" element={<FranchiseCharts />} />
              <Route path="sales" element={<FranchiseSales />} />
              <Route path="history" element={<FranchiseSalesHistory />} />
              <Route path="settings" element={<FranchiseSettings />} />
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
