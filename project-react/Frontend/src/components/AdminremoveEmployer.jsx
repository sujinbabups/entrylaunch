import React, { useEffect, useState } from 'react';

const AdminremoveEmployer = () => {
  const [employers, setEmployers] = useState([]);
  const [selectedEmployer, setSelectedEmployer] = useState(null);

  // Fetch employers when the component mounts
  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await fetch('/api/employers'); // Adjust the URL to your endpoint
        if (response.ok) {
          const data = await response.json();
          setEmployers(data);
        } else {
          console.error('Failed to fetch employers');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchEmployers();
  }, []);

  // Handle employer selection
  const handleEmployerSelect = (e) => {
    const employerId = e.target.value;
    const employer = employers.find(emp => emp.Emp_Id === employerId); // Ensure this matches your data structure
    setSelectedEmployer(employer);
  };

  // Handle employer removal
  const removeEmployer = async () => {
    if (!selectedEmployer) return;

    try {
      const response = await fetch(`/api/delete/${selectedEmployer.Emp_Id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setEmployers(employers.filter(emp => emp.Emp_Id !== selectedEmployer.Emp_Id));
        setSelectedEmployer(null);
      } else {
        console.error('Failed to remove employer');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="remEmployer bg-gradient-to-r from-blue-700 to-blue-300 h-[440px] mt-12 w-[70%] rounded-lg" id="rmemp">
        <h2 className="text-2xl font-sans mt-8 ml-10 text-white font-bold">Remove Employer</h2>
        <label htmlFor="selectEmp" className="font-sans text-white font-bold text-xl ml-6 relative top-[5%]">Select an employer :</label>
        <select name="selectEmp" id="selectEmp" onChange={handleEmployerSelect} className="border p-2 rounded relative top-[5%] w-[15%]">
          <option value="" disabled selected >----</option>
          {employers.map((employer) => (
            <option key={employer.Emp_Id} value={employer.Emp_Id}>{employer.Emp_Id}</option>
          ))}
        </select>
        {selectedEmployer && (
          <table id="removeEmp" className="ml-[380px] mt-[50px]">
            <thead>
              <tr>
                <th className="bg-purple-900 text-white h-12 w-[130px]">EmpID</th>
                <th className="bg-purple-900 text-white h-12 w-[200px]">Co.Name</th>
              </tr>
            </thead>
           
            <tbody> 
              <tr className="bg-white text-white h-12 w-[130px] text-center" id="traw">
                <td className="border border-slate-300 text-blue-900 text-2xl font-bold" id="empid">{selectedEmployer.Emp_Id}</td>
                <td id="coname" className="text-blue-900 text-2xl font-bold">{selectedEmployer.co_name}</td>
              </tr>
            </tbody>
          </table>
        )}
        <input
          type="submit"
          value="Remove"
          onClick={removeEmployer}
          className="bg-purple-900 text-white py-2 px-4 rounded cursor-pointer ml-[65%] relative top-[5%] hover:bg-red-500 transition ease-in-out delay-1s"
        />
      </div>
    </>
  );
}

export default AdminremoveEmployer;
