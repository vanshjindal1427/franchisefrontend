import React, { useEffect } from "react";
import { useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ApplicantsTable = () => {
  const [applications,setApplications] = useState([]);
  const [filterApplications, setFilterApplications] = useState([]);
  const [rowsLimit] = useState(6);
  const [rowsToShow, setRowsToShow] = useState(applications.slice(0, rowsLimit));
  const [customPagination, setCustomPagination] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState(localStorage.getItem('applicationFilter') || "3");
  
  let navigate = useNavigate();
  function redirect(path) {
    navigate(path);
  }
  useEffect(() => {
    getApplications();
  }, []);
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    localStorage.setItem('applicationFilter', value);
  }
  useEffect(() => {
    setRowsToShow(filterApplications.slice(0, rowsLimit));
    setTotalPage(Math.ceil(filterApplications.length / rowsLimit));
  }, [filterApplications]) ;
  async function getApplications() {
    let url = "http://localhost:2007/admin/showApplications";
    var applicationsjson = await axios.get(url);
    if(filter !== "3") {
      setFilterApplications(applicationsjson.data.filter((application) => application.status === parseInt(filter)));
    }
    else {
      setFilterApplications(applicationsjson.data);
    }
    setApplications(applicationsjson.data);
    setRowsToShow(filterApplications.slice(0,rowsLimit));
    setTotalPage(Math.ceil(filterApplications.length / rowsLimit));
  }
  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    const newArray = filterApplications.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(currentPage + 1);
  };
  const changePage = (value) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = filterApplications.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(value);
  };
  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = filterApplications.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
  };
  useMemo(() => {
    setCustomPagination(
      Array(Math.ceil(filterApplications?.length / rowsLimit)).fill(null)
    );
  }, [filterApplications]);
  
  async function doDecline(email) {
    alert(email);
    let obj = { emailid: email };
    let url = "http://localhost:2007/admin/declineApplication";
    let resp = await axios.post(url, obj, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    alert(resp.data);
    getApplications();
  }
  

  return (
    <>
    
      <div className="min-h-screen h-full bg-white flex  items-center justify-center pt-10 pb-14">
        <div className="w-full max-w-7xl px-2">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-medium">
                Applications for Franchise
              </h1>
            </div>
            
            <div>
              <button onClick={getApplications} className="mx-5 bg-amber-500 px-2 py-1 rounded-2xl hover:bg-red-700 hover:text-gray-50 hover:ring-black hover:ring-2">Get Applications</button>
              <select name="" id="" 
                value={filter}  
                onChange={handleFilterChange}>
                <option value="3">All</option>
                <option value="1">Approved</option>
                <option value="-1">Declined</option>
                <option value="2">Franchise</option>
              </select>
            </div>
          </div>
          <div className="w-full overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2">
            <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border ">
              <thead className="rounded-lg text-base text-white font-semibold w-full">
                <tr className="bg-[#222E3A]/[6%]">
                  <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                    ID
                  </th>
                  <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                    Email ID
                  </th>
                  <th className="py-3 px-3  justify-center gap-1 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                    Current Business (Since)
                  </th>
                  <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                    City
                  </th>
                  <th className="py-3 px-1 text-[#212B36] sm:text-base font-bold whitespace-nowrap w-[120px]">
                    Area in sq.ft (floor)
                  </th>
                  <th className="flex items-center py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap gap-1">
                    Ownership
                  </th>
                  
                  <th className="py-3 px-2 text-[#212B36] sm:text-base font-bold whitespace-nowrap text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {rowsToShow?.map((data, index) => (
                  <tr
                    className={`${index % 2 == 0 ? "bg-white" : "bg-[#222E3A]/[6%]"
                      }`}
                    key={index}
                  >
                    <td
                      className={`py-2 px-3 font-normal text-base ${index == 0
                        ? "border-t-2 border-black"
                        : index == rowsToShow?.length
                          ? "border-y"
                          : "border-t"
                        } whitespace-nowrap`}
                    >
                      {currentPage * rowsLimit + index + 1}
                    </td>
                    
                    <td
                      className={`py-2 px-3 font-normal text-base ${index == 0
                        ? "border-t-2 border-black"
                        : index == rowsToShow?.length
                          ? "border-y"
                          : "border-t"
                        } whitespace-nowrap`}
                    >
                      {data.emailid}
                    </td>
                    <td
                      className={`py-2 px-3 font-normal text-base ${index == 0
                        ? "border-t-2 border-black"
                        : index == rowsToShow?.length
                          ? "border-y"
                          : "border-t"
                        } whitespace-nowrap`}
                    >
                      {data.currBuss} ({data.since})
                    </td>
                    <td
                      className={`py-2 px-3 text-base  font-normal ${index == 0
                        ? "border-t-2 border-black"
                        : index == rowsToShow?.length
                          ? "border-y"
                          : "border-t"
                        } whitespace-nowrap`}
                    >
                      {data.city}
                    </td>
                    <td
                      className={`py-2 px-1 text-base  font-normal ${index == 0
                        ? "border-t-2 border-black"
                        : index == rowsToShow?.length
                          ? "border-y"
                          : "border-t"
                        } min-w-[250px] w-[120px] truncate`}
                    >
                      {data.area} ({data.floor})
                    </td>
                    <td
                      className={`py-5 px-4 text-base  font-normal ${index == 0
                        ? "border-t-2 border-black"
                        : index == rowsToShow?.length
                          ? "border-y"
                          : "border-t"
                        }`}
                    >
                      {data.ownership}
                    </td>
                    
                    <td
                      className={`py-5 px-4 text-base  font-normal ${index == 0
                        ? "border-t-2 border-black"
                        : index == rowsToShow?.length
                          ? "border-y"
                          : "border-t"
                        }`}
                    >
                      <div className="flex gap-2">

                        <button className="py-3 rounded-full border-2 bg-blue-600 hover:bg-blue-700 px-6 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none active:shadow-lg"
                          onClick={() => redirect("/moreDetails/" + data.emailid)}
                        >
                          Info
                        </button>
                        
                        <button className="py-3 rounded-full border-2 bg-red-600 hover:bg-red-700 px-6 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none active:shadow-lg"
                          onClick={() => doDecline(data.emailid)} >
                          Decline
                        </button>
                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full  flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
            <div className="text-lg">
              Showing {currentPage == 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
              {currentPage == totalPage - 1
                ? applications?.length
                : (currentPage + 1) * rowsLimit}{" "}
              of {applications?.length} entries
            </div>
            <div className="flex">
              <ul
                class="flex justify-center items-center gap-x-[10px] z-30"
                role="navigation"
                aria-label="Pagination"
              >
                <li
                  class={` prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${currentPage == 0
                    ? "bg-[#cccccc] pointer-events-none"
                    : " cursor-pointer"
                    }
  `}
                  onClick={previousPage}
                >
                  <img src="https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg" />
                </li>
                {customPagination?.map((data, index) => (
                  <li
                    className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer ${currentPage == index
                      ? "text-blue-600  border-sky-500"
                      : "border-[#E4E4EB] "
                      }`}
                    onClick={() => changePage(index)}
                    key={index}
                  >
                    {index + 1}
                  </li>
                ))}
                <li
                  class={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${currentPage == totalPage - 1
                    ? "bg-[#cccccc] pointer-events-none"
                    : " cursor-pointer"
                    }`}
                  onClick={nextPage}
                >
                  <img src="https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ApplicantsTable;