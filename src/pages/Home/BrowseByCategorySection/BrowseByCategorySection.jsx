import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./Tabs.css";
import BrowseByCategoryCard from "./BrowseByCategoryCard";
import Title from "../../../reusableComponents/Title";
import { Link } from "react-router-dom";
import useCategories from "../../../hooks/useCategories";
import usePostedJobs from "../../../hooks/usePostedJobs";
import Loading from "../../../reusableComponents/Loading";

const BrowseByCategorySection = () => {
  const title = "Browse By Category";

  const [tabIndex, setTabIndex] = useState(0);

  const [webDevelopmentJobs, setWebDevelopmentJobs] = useState([]);
  const [digitalMarketingJobs, setDigitalMarketingJobs] = useState([]);
  const [graphicDesignJobs, setGraphicDesignJobs] = useState([]);

  const [loadingCategories, fetchedCategories] = useCategories();

  const [
    loadingPostedJobs,
    fetchedPostedJobs,
    filteredWebDevelopmentJobs,
    filteredDigitalMarketingJobs,
    filteredGraphicDesignJobs,
  ] = usePostedJobs();

  useEffect(() => {
    setWebDevelopmentJobs(filteredWebDevelopmentJobs);
    setDigitalMarketingJobs(filteredDigitalMarketingJobs);
    setGraphicDesignJobs(filteredGraphicDesignJobs);
  }, [fetchedPostedJobs]);

  if (loadingCategories || loadingPostedJobs) {
    return <Loading></Loading>;
  } else {
    return (
      <div className="py-10">
        <Title title={title}></Title>

        <div className="flex flex-col justify-center items-center py-10">
          <Tabs
            selectedIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
          >
            <TabList>
              <div className="w-1/2 mx-auto flex justify-center items-center gap-6 bg-[#a1dada41] rounded-full p-3">
                {fetchedCategories.map((category) => (
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

          <Link
            to="/popularity"
            className="btn bg-[#323484] text-white mx-auto"
          >
            View Category Based Job Demand
          </Link>
        </div>
      </div>
    );
  }
};

export default BrowseByCategorySection;
