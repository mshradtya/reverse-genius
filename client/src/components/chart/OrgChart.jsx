import React, {
  useState,
  useRef,
  useLayoutEffect,
  useContext,
  useEffect,
} from "react";
import ReactDOMServer from "react-dom/server";
import { OrgChart } from "d3-org-chart";
import CustomNodeContent from "./CustomNodeContent";
import CustomExpandButton from "./CustomExpandButton";
import axios from "../../api/axios";
import { AllContext } from "../../context/All";
import ChartFunctionalities from "./ChartFunctionalities";

const OrganizationalChart = ({
  chartData,
  openDrawer,
  openHNDrawer,
  setDrawerContent,
  setHNDrawerContent,
}) => {
  const d3Container = useRef(null);
  const [chart, setChart] = useState(null);
  const { currentApp, highlightedNodes, setNode } = useContext(AllContext);
  const [isCompact, setIsCompact] = useState(false);

  const toggleCompactView = () => {
    setIsCompact((prev) => !prev);
  };

  const handleNodeClick = async (d) => {
    if (!d.data._highlighted && d.id !== "1" && !d.data.isNew) {
      try {
        await axios
          .post("/SendSingleNode", {
            nodeName: d.id,
            ftype: d.data.functionType,
            appName: currentApp,
          })
          .then((res) => {
            setDrawerContent(res.data);
            openDrawer();
          })
          .catch((err) => {
            console.log(err, "err");
          });
      } catch (error) {
        console.error("Upload failed: ", error);
      }
    } else if (d.data._highlighted === true) {
      setNode(d.id);
      openHNDrawer();
    } else if (d.data.isNew == true) {
      setDrawerContent({
        functionExplanation: d.data.functionExplanation,
        functionCode: d.data.functionCode,
      });
      openDrawer();
    }
  };

  useLayoutEffect(() => {
    const chart = new OrgChart();
    if (chartData && d3Container.current) {
      chart
        .container(d3Container.current)
        .initialZoom(0.5)
        .data(chartData[0].data)
        .layout("top")
        .compact(isCompact)
        .nodeWidth((d) => 350)
        .nodeHeight((d) => 140)
        .compactMarginBetween((d) => 80)
        .buttonContent((node, state) => {
          return ReactDOMServer.renderToStaticMarkup(
            <CustomExpandButton {...node.node} />
          );
        })
        .nodeUpdate(function () {})

        .nodeContent((d) => {
          return ReactDOMServer.renderToStaticMarkup(
            <CustomNodeContent {...d} />
          );
        })
        .expandAll();

      chart.clearHighlighting();

      highlightedNodes.forEach((nodeId) => {
        chart.setHighlighted(nodeId);
      });

      chart.onNodeClick((d) => {
        handleNodeClick(d);
      });

      chart.render();
      setChart(chart);
    }
  }, [chartData, highlightedNodes]);

  return (
    <>
      <div className="org-chart" ref={d3Container}></div>
      <ChartFunctionalities
        chart={chart}
        toggleCompactView={toggleCompactView}
        isCompact={isCompact}
        setIsCompact={setIsCompact}
        // to be used by LanguagesMenu
        handleNodeClick={handleNodeClick}
      />
    </>
  );
};

export default OrganizationalChart;
