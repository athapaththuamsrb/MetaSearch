import React, { useState, useEffect } from "react";
// import summaryJSONList from "./../data/summaryList.json";
import Summary from "./../components/Summary";
import Loader from "../components/Loader";

const SummaryPage = () => {
  const [summaryList, setSummaryList] = useState([]);
  const [isSummaryListLoaded, setSummaryListLoaded] = useState(false);
  useEffect(() => {
    fetch("http://localhost:5000/summary")
      .then((response) => response.json())
      .then((data) => {
        setSummaryList(data);
        setSummaryListLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div>
      {!isSummaryListLoaded && <Loader></Loader>}
      {isSummaryListLoaded && <Summary summaryList={summaryList}></Summary>}
    </div>
  );
};

export default SummaryPage;
