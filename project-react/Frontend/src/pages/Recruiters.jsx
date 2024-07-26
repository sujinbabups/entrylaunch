import { useEffect, useState } from "react";
import '../App.css' // Ensure you have the updated CSS file

const Recruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    // Fetch recruiters data from the backend
    const fetchRecruiters = async () => {
      try {
        const response = await fetch('/api/recruiters');
        if (response.ok) {
          const data = await response.json();
          setRecruiters(data);
        } else {
          console.error('Failed to fetch recruiters');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRecruiters();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prevIndex) => (prevIndex + 1) % recruiters.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [recruiters]);

  return (
    <>
      <div className="h-[450px] w-3/4 max-w-3xl p-4 bg-white rounded-2xl m-auto mt-[-860px]">
        <h2 className="text-3xl font-bold font-serif ml-[38%]">Ur Recruiters</h2>
        <div className="h-[250px] w-3/4 bg-gradient-to-t to-gray-400 m-auto rounded-lg">
          <div className="recruiters-boxes">
            {recruiters.map((recruiter, index) => (
              <div
                key={recruiter._id}
                className={`font-serif recruiter-box ${
                  index === visibleIndex ? "slide-in" : "slide-out"
                }`}
              >
                <h1 className="text-6xl font-bold">{recruiter.co_name}</h1>
                <h3 className="text-3xl font-bold">Type of company {recruiter.type}</h3>
                <h3 className="text-3xl font-bold">contact {recruiter.email}</h3>
                <h3 className="text-3xl font-bold">in {recruiter.place}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Recruiters;
