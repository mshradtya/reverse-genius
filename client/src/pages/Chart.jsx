import React, { useContext, useEffect, useState } from "react";
import OrganizationalChart from "../components/chart/OrgChart";
import chartData from "../data";
import ContentDrawer from "../components/drawers/ContentDrawer";
import HNContentDrawer from "../components/drawers/HNContentDrawer";
import { AllContext } from "../context/All";
import { Spinner } from "@chakra-ui/react";
import axios from "../api/axios";

const Chart = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState({});

  // HN = HIGHLIGHTED NODE :))))
  const [isHNDrawerOpen, setIsHNDrawerOpen] = useState(false);
  const [HNDrawerContent, setHNDrawerContent] = useState({});

  const {
    data,
    setData,
    chartData,
    setChartData,
    setCurrentApp,
    setHighlightedNodes,
    currentApp,
  } = useContext(AllContext);

  const filterLanguageData = (data, targetId) => {
    const result = [];

    for (const obj of data) {
      if (obj.id === targetId) {
        const { parentId, ...newObject } = obj;
        result.push(newObject);
      } else if (
        obj.parentId === targetId ||
        result.some((item) => item.id === obj.parentId)
      ) {
        result.push(obj);
      }
    }

    return result;
  };

  const fetchChartData = async () => {
    try {
      await axios
        .post("/SendSingleApplication", {
          ApplicationName: currentApp ?? "AnnadataGuru",
        })
        .then((res) => {
          const languageIds = ["Javascript", "Python", "Database"];
          const allLanguageData = [{ id: "Default", data: res.data }];

          languageIds.forEach((id) => {
            const languageData = filterLanguageData(res.data, id);
            allLanguageData.push({ id, data: languageData });
          });

          // setData(res.data);
          console.log(allLanguageData);
          setChartData(allLanguageData);
          setHighlightedNodes([]);
        })
        .catch((err) => {
          console.log(err, "error");
        });
    } catch (error) {
      console.error("Couldn't fetch data: ", error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [currentApp, setCurrentApp]);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openHNDrawer = () => {
    setIsHNDrawerOpen(true);
  };

  const closeHNDrawer = () => {
    setIsHNDrawerOpen(false);
  };

  return chartData ? (
    <div>
      <OrganizationalChart
        chartData={chartData}
        isDrawerOpen={isDrawerOpen}
        isHNDrawerOpen={isHNDrawerOpen}
        openDrawer={openDrawer}
        openHNDrawer={openHNDrawer}
        closeDrawer={closeDrawer}
        closeHNDrawer={closeHNDrawer}
        setDrawerContent={setDrawerContent}
        setHNDrawerContent={setHNDrawerContent}
      />

      {/* <ChartIcons /> */}
      <ContentDrawer
        drawerContent={drawerContent}
        isDrawerOpen={isDrawerOpen}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
      />
      <HNContentDrawer
        HNDrawerContent={HNDrawerContent}
        isHNDrawerOpen={isHNDrawerOpen}
        openHNDrawer={openHNDrawer}
        closeHNDrawer={closeHNDrawer}
      />
    </div>
  ) : (
    <div className="container">
      <div className="con-child">
        <Spinner
          size="xl"
          color="brand.primary"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
        />
      </div>
    </div>
  );
};

export default Chart;
