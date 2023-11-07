import axios from "axios";
import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
import "./Tabs.css";
import BrowseByCategoryCard from "./BrowseByCategoryCard";

const BrowseByCategorySection = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const categories = ["Web Development", "Digital Marketing", "Graphic Design"];

  const [webDevelopmentJobs, setWebDevelopmentJobs] = useState([]);
  const [digitalMarketingJobs, setDigitalMarketingJobs] = useState([]);
  const [graphicDesignJobs, setGraphicDesignJobs] = useState([]);

  //   const [categoryWiseJobs, setCategoryWiseJobs] = useState([]);
  //   useEffect(() => {
  //     for (let category of categories) {
  //       fetch(`http://localhost:5000/jobs/${category}`)
  //         .then((res) => res.json())
  //         .then((data) => {
  //           const cwd = {
  //             category,
  //             jobs: data,
  //           };

  //           let newList = [...categoryWiseJobs, cwd];
  //           setCategoryWiseJobs(newList);
  //           //   console.log(newList);
  //         });
  //     }
  //   }, []);

  const [postedJobs, setPostedJobs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/posted-jobs`)
      .then((res) => res.json())
      .then((data) => {
        setPostedJobs(data);
      });
  }, []);

  console.log(postedJobs);

  useEffect(() => {
    if (postedJobs.length > 0) {
      const joblist1 = [];
      const joblist2 = [];
      const joblist3 = [];
      for (let job of postedJobs) {
        if (job.category === "Web Development") {
          joblist1.push(job);
        } else if (job.category === "Digital Marketing") {
          joblist2.push(job);
        } else {
          joblist3.push(job);
        }
      }
      setWebDevelopmentJobs(joblist1);
      setDigitalMarketingJobs(joblist2);
      setGraphicDesignJobs(joblist3);
    }
  }, [postedJobs]);
  console.log(webDevelopmentJobs);
  return (
    <div>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <div className="w-1/2 mx-auto flex justify-center items-center gap-6 bg-[#a1dada41] rounded-full p-3">
            {categories.map((category) => (
              <Tab key={category}>{category}</Tab>
            ))}
          </div>
        </TabList>

        <TabPanel>
          <div className="grid grid-cols-3 gap-6 py-10">
            {webDevelopmentJobs.map((job) => (
              <BrowseByCategoryCard
                key={job._id}
                job={job}
              ></BrowseByCategoryCard>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-3 gap-6 py-10">
            {digitalMarketingJobs.map((job) => (
              <BrowseByCategoryCard
                key={job._id}
                job={job}
              ></BrowseByCategoryCard>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-3 gap-6 py-10">
            {graphicDesignJobs.map((job) => (
              <BrowseByCategoryCard
                key={job._id}
                job={job}
              ></BrowseByCategoryCard>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default BrowseByCategorySection;
