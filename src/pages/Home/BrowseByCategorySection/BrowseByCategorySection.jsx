import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./Tabs.css";
import BrowseByCategoryCard from "./BrowseByCategoryCard";
import Title from "../../../reusableComponents/Title";
import { Link } from "react-router-dom";

const BrowseByCategorySection = () => {
  const title = "Browse By Category";

  const [tabIndex, setTabIndex] = useState(0);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`https://b8-a11-online-marketplace-server.vercel.app/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  const [webDevelopmentJobs, setWebDevelopmentJobs] = useState([]);
  const [digitalMarketingJobs, setDigitalMarketingJobs] = useState([]);
  const [graphicDesignJobs, setGraphicDesignJobs] = useState([]);

  const [postedJobs, setPostedJobs] = useState([]);

  useEffect(() => {
    fetch(`https://b8-a11-online-marketplace-server.vercel.app/posted-jobs`)
      .then((res) => res.json())
      .then((data) => {
        setPostedJobs(data);
      });
  }, []);

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
  return (
    <div className="py-10">
      <Title title={title}></Title>

      <div className="flex flex-col justify-center items-center py-10">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <div className="w-1/2 mx-auto flex justify-center items-center gap-6 bg-[#a1dada41] rounded-full p-3">
              {categories.map((category) => (
                <Tab key={category._id}>{category.category}</Tab>
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

        <Link to="/popularity" className="btn bg-[#323484] text-white mx-auto">
          View Category Based Job Demand
        </Link>
      </div>
    </div>
  );
};

export default BrowseByCategorySection;
