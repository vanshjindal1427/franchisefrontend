import React, { useState } from "react";
import axios from "axios";
// import { Input, Radio } from 'antd';

function ApplicationForm() {
  const [darkMode, setDarkMode] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [obj, setObj] = useState({
    emailid: "",
    fullname: "",
    contact : "",
    residence : "",
    currBuss : "",
    since : "",
    city : "",
    pincode : "",
    area : "",
    floor : "",
    siteAdd : "",
    ownership : "",
    validID : null,
  })
  function doUpdate(event) {
    var { name, value } = event.target;
    setObj({ ...obj, [name]: value });
  }
  function handleOwnershipChange(event) {
    setObj({ ...obj, ownership: event.target.value });
  }
  function handleCheckboxChange(event) {
    setIsChecked(event.target.checked);
  }
  function updatePic(event) {
    setObj({ ...obj, ["validID"]: event.target.files[0] })
  }
  // function applyForm(e)
  // {
  //   e.preventDefault();
  //   alert("Form submitted successfully");
  //   console.log(obj);
  // }
  async function applyForm(e) {
    e.preventDefault();

    let url = "https://franchisebackend-production-a6c5.up.railway.app/applicant/saveApplication";

    let fd = new FormData(); // FormData is an inbuilt class in JS
    for (let prop in obj) {
      fd.append(prop, obj[prop]); // append all the properties of obj to fd
    }
    let resp = await axios.post(url, fd, {
      headers: { "Content-Type": "multipart/form-data" }, // multipart/form-data is used to send files
    });
    if (resp.data.status == true) {
      alert(resp.data.msg);
    } else {
      alert(resp.data.msg);
    }
  }
  // return (
  //   <div className="flex flex-col justify-center items-center w-full h-full bg-[#282D2D] px-3">
  //     <div className=" flex flex-col items-end justify-start  overflow-hidden mb-2 xl:max-w-3xl w-full">
  //       {/* <div className="flex">
  //         <h3 className="text-white">Dark Mode : &nbsp;</h3>
  //         <label class="inline-flex relative items-center mr-5 cursor-pointer">
  //           <input
  //             type="checkbox"
  //             className="sr-only peer"
  //             checked={darkMode}
  //             readOnly
  //           />
  //           <div
  //             onClick={() => {
  //               setDarkMode(!darkMode);
  //             }}
  //             className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
  //           ></div>
  //         </label>
  //       </div> */}
  //     </div>
  //     <div
  //       className={`xl:max-w-3xl ${
  //         darkMode ? "bg-black" : "bg-white"
  //       }  w-full p-5 sm:p-10 rounded-md`}
  //     >
  //       <h1
  //         className={`text-center text-xl sm:text-3xl font-semibold ${
  //           darkMode ? "text-white" : "text-black"
  //         }`}
  //       >
  //         Apply for our Franchise!
  //       </h1>
  //       <form action="" onSubmit={applyForm}>
  //         <div className="w-full mt-8">
  //           <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
  //             <div className="flex flex-col sm:flex-row gap-3">
  //               <input
  //                 className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${darkMode
  //                     ? "bg-[#302E30] text-white focus:border-white"
  //                     : "bg-gray-100 text-black focus:border-black"
  //                   }`}
  //                 type="email"
  //                 placeholder="Email ID"
  //                 name="emailid"
  //                 onChange={doUpdate}
  //                 required
  //               />
  //               <input
  //                 className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
  //                     ? "bg-[#302E30] text-white focus:border-white"
  //                     : "bg-gray-100 text-black focus:border-black"
  //                   }`}
  //                 type="text"
  //                 placeholder="Your Full Name"
  //                 name="fullname"
  //                 onChange={doUpdate}
  //                 required
  //               />
  //             </div>

  //             <input
  //               className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
  //                   ? "bg-[#302E30] text-white focus:border-white"
  //                   : "bg-gray-100 text-black focus:border-black"
  //                 }`}
  //               type="tel"
  //               placeholder="Contact No."
  //               name="contact"
  //               onChange={doUpdate}
  //               required
  //             />
  //             <input
  //               className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
  //                   ? "bg-[#302E30] text-white focus:border-white"
  //                   : "bg-gray-100 text-black focus:border-black"
  //                 }`}
  //               type="text"
  //               placeholder="Your Residence"
  //               name="residence"
  //               onChange={doUpdate}
  //               required
  //             />
  //             <hr />
  //             <div className="flex flex-col sm:flex-row gap-3">
  //               <input
  //                 className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
  //                     ? "bg-[#302E30] text-white focus:border-white"
  //                     : "bg-gray-100 text-black focus:border-black"
  //                   }`}
  //                 type="text"
  //                 placeholder="Your Current Bussiness"
  //                 name="currBuss"
  //                 onChange={doUpdate}
  //               />

  //               <input
  //                 className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
  //                     ? "bg-[#302E30] text-white focus:border-white"
  //                     : "bg-gray-100 text-black focus:border-black"
  //                   }`}
  //                 type="number"
  //                 placeholder="Since"
  //                 name="since"
  //                 onChange={doUpdate}
  //               />
  //             </div>
  //             <hr />
  //             <div className="flex flex-col sm:flex-row gap-3">
  //               <input
  //                 className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
  //                     ? "bg-[#302E30] text-white focus:border-white"
  //                     : "bg-gray-100 text-black focus:border-black"
  //                   }`}
  //                 type="text"
  //                 placeholder="City"
  //                 name="city"
  //                 onChange={doUpdate}
  //                 required
  //               />

  //               <input
  //                 className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
  //                     ? "bg-[#302E30] text-white focus:border-white"
  //                     : "bg-gray-100 text-black focus:border-black"
  //                   }`}
  //                 type="number"
  //                 placeholder="Pincode"
  //                 name="pincode"
  //                 onChange={doUpdate}
  //                 required
  //               />
  //             </div>
  //             <div className="flex flex-col sm:flex-row gap-3">
  //               <input
  //                 className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
  //                     ? "bg-[#302E30] text-white focus:border-white"
  //                     : "bg-gray-100 text-black focus:border-black"
  //                   }`}
  //                 type="number"
  //                 placeholder="Area in sq. ft."
  //                 name="area"
  //                 onChange={doUpdate}
  //                 required
  //               />

  //               <input
  //                 className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
  //                     ? "bg-[#302E30] text-white focus:border-white"
  //                     : "bg-gray-100 text-black focus:border-black"
  //                   }`}
  //                 type="number"
  //                 placeholder="Floor"
  //                 name="floor"
  //                 onChange={doUpdate}
  //                 required
  //               />
  //             </div>
  //             <input
  //               className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
  //                 ? "bg-[#302E30] text-white focus:border-white"
  //                 : "bg-gray-100 text-black focus:border-black"
  //                 }`}
  //               type="text"
  //               placeholder="Site Address"
  //               name="siteAdd"
  //               onChange={doUpdate}
  //               required
  //             />
  //             {/* <div className="flex flex-col items-center sm:flex-row gap-3 ">
  //             <span className="text-gray-600 mx-3">
  //               <b>Ownership Status: </b>
  //             </span>
  //             <input type="radio" name="ownership" id="owner"/> 
  //             <label htmlFor="owner" className=" text-gray-800">Owner</label>
  //             <input type="radio" name="ownership" id="" /> &nbsp;Rented
  //           </div> */}
  //             <hr />
  //             <div className="flex flex-auto justify-between items-center sm:flex-row gap-3">
  //               <div className=" justify-center gap-3 py-5">
  //                 <b>Ownership Status :</b>
  //                 <div>
  //                   <input
  //                     className="mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white align-top checked:border-4 checked:border-amber-500"
  //                     type="radio"
  //                     name="ownership"
  //                     id="owner"
  //                     value="Owned"
  //                     checked={obj.ownership === "Owned"}
  //                     onChange={handleOwnershipChange}
  //                   />
  //                   <label className="text-gray-800" htmlFor="radioidthree">
  //                     Owned
  //                   </label>
  //                 </div>
  //                 <div>
  //                   <input
  //                     className="mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white  align-top checked:border-4 checked:border-amber-500  disabled:border-blue-400"
  //                     type="radio"
  //                     name="ownership"
  //                     id="rented"
  //                     value="Rented"
  //                     checked={obj.ownership === "Rented"}
  //                     onChange={handleOwnershipChange}
  //                   />
  //                   <label className="text-gray-800" htmlFor="radioidfour">
  //                     Rented
  //                   </label>
  //                 </div>
  //               </div>
  //               <div className="flex flex-col gap-3">
  //                 <b>Upload a valid ID proof : </b>
  //                 <input type="file" className="ml-16" onChange={updatePic}/>
  //               </div>
  //             </div>
  //             <hr />
  //           </div>


  //           <div className="flex justify-center items-center flex-col gap-1">
  //             <div>
  //               <label className="flex items-center space-x-2">
  //                 <input
  //                   type="checkbox"
  //                   className="h-4 w-4 cursor-pointer checked:accent-orange-600"
  //                   checked={isChecked}
  //                   onChange={handleCheckboxChange}
  //                 />
  //                 <span className="hover:cursor-pointer">I confirm that the credentials filled above are correct.</span>
  //               </label>

  //             </div>
  //             <button className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
  //               disabled={!isChecked}
  //               // onClick={applyForm}
  //               type="submit"
  //             >
  //               <svg
  //                 className="w-6 h-6 -ml-2"
  //                 fill="none"
  //                 stroke="currentColor"
  //                 strokeWidth="2"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //               >
  //                 <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
  //                 <circle cx="8.5" cy="7" r="4" />
  //                 <path d="M20 8v6M23 11h-6" />
  //               </svg>
  //               <span className="ml-3">Apply</span>
  //             </button>
  //           </div>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // );

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
              {/* Form Container */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  {/* Form Header */}
                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-6">
                      <h1 className="text-3xl font-bold text-white text-center">
                          Apply for our Franchise
                      </h1>
                      <p className="text-white/80 text-center mt-2">
                          Fill out the form below to start your journey with us
                      </p>
                  </div>
  
                  {/* Form Content */}
                  <form onSubmit={applyForm} className="px-8 py-6 space-y-6">
                      {/* Personal Information Section */}
                      <div className="space-y-6">
                          <div className="bg-gray-50 px-6 py-4 rounded-lg">
                              <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                                      <input
                                          type="email"
                                          name="emailid"
                                          onChange={doUpdate}
                                          required
                                          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                          placeholder="Enter your email"
                                      />
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                      <input
                                          type="text"
                                          name="fullname"
                                          onChange={doUpdate}
                                          required
                                          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                          placeholder="Enter your full name"
                                      />
                                  </div>
                              </div>
                          </div>
  
                          {/* Contact Information */}
                          <div className="bg-gray-50 px-6 py-4 rounded-lg">
                              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Details</h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                                      <input
                                          type="tel"
                                          name="contact"
                                          onChange={doUpdate}
                                          required
                                          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                          placeholder="Enter contact number"
                                      />
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Residence</label>
                                      <input
                                          type="text"
                                          name="residence"
                                          onChange={doUpdate}
                                          required
                                          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                          placeholder="Enter residence details"
                                      />
                                  </div>
                              </div>
                          </div>
  
                          {/* Business Information */}
                          <div className="bg-gray-50 px-6 py-4 rounded-lg">
                              <h2 className="text-xl font-semibold text-gray-800 mb-4">Business Information</h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Business</label>
                                      <input
                                          type="text"
                                          name="currBuss"
                                          onChange={doUpdate}
                                          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                          placeholder="Current business type"
                                      />
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Since (Year)</label>
                                      <input
                                          type="number"
                                          name="since"
                                          onChange={doUpdate}
                                          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                          placeholder="Business start year"
                                      />
                                  </div>
                              </div>
                          </div>
  
                          {/* Site Details */}
                          <div className="bg-gray-50 px-6 py-4 rounded-lg">
                              <h2 className="text-xl font-semibold text-gray-800 mb-4">Site Details</h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                      <input
                                          type="text"
                                          name="city"
                                          onChange={doUpdate}
                                          required
                                          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                          placeholder="Enter city name"
                                      />
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                                      <input
                                          type="number"
                                          name="pincode"
                                          onChange={doUpdate}
                                          required
                                          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                          placeholder="Enter pincode"
                                      />
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Area (sq. ft.)</label>
                                      <input
                                          type="number"
                                          name="area"
                                          onChange={doUpdate}
                                          required
                                          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                          placeholder="Enter area in sq. ft."
                                      />
                                  </div>
                                  <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Floor</label>
                                      <input
                                          type="number"
                                          name="floor"
                                          onChange={doUpdate}
                                          required
                                          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                          placeholder="Enter floor number"
                                      />
                                  </div>
                              </div>
                              <div className="mt-4">
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Complete Address</label>
                                  <textarea
                                      name="siteAdd"
                                      onChange={doUpdate}
                                      required
                                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                      placeholder="Enter complete address"
                                      rows="3"
                                  />
                              </div>
                          </div>
  
                          {/* Ownership & ID Proof */}
                          <div className="bg-gray-50 px-6 py-4 rounded-lg">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Ownership Status</h3>
                                      <div className="space-y-2">
                                          <label className="flex items-center space-x-3">
                                              <input
                                                  type="radio"
                                                  name="ownership"
                                                  value="Owned"
                                                  checked={obj.ownership === "Owned"}
                                                  onChange={handleOwnershipChange}
                                                  className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                                              />
                                              <span className="text-gray-700">Owned</span>
                                          </label>
                                          <label className="flex items-center space-x-3">
                                              <input
                                                  type="radio"
                                                  name="ownership"
                                                  value="Rented"
                                                  checked={obj.ownership === "Rented"}
                                                  onChange={handleOwnershipChange}
                                                  className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                                              />
                                              <span className="text-gray-700">Rented</span>
                                          </label>
                                      </div>
                                  </div>
                                  <div>
                                      <h3 className="text-lg font-semibold text-gray-800 mb-3">ID Proof</h3>
                                      <input
                                          type="file"
                                          onChange={updatePic}
                                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                                      />
                                  </div>
                              </div>
                          </div>
                      </div>
  
                      {/* Terms and Submit */}
                      <div className="pt-6 border-t border-gray-200">
                          <label className="flex items-center space-x-3">
                              <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={handleCheckboxChange}
                                  className="h-4 w-4 rounded text-orange-500 focus:ring-orange-500"
                              />
                              <span className="text-gray-700">I confirm that the credentials filled above are correct.</span>
                          </label>
  
                          <button
                              type="submit"
                              disabled={!isChecked}
                              className="mt-6 w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-6 rounded-lg font-semibold text-lg shadow-lg hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                          >
                              <svg
                                  className="w-6 h-6 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                              >
                                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                  <circle cx="8.5" cy="7" r="4" />
                                  <path d="M20 8v6M23 11h-6" />
                              </svg>
                              Submit Application
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  );
}
export default ApplicationForm;
