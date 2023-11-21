import React, { useContext } from "react";
import { FaFileArchive } from "react-icons/fa";
import { RiFilePaper2Fill } from "react-icons/ri";
import { BiLogoPython } from "react-icons/bi";
import { BiLogoJavascript } from "react-icons/bi";
import { PiFileSqlBold } from "react-icons/pi";
import { PiBracketsCurlyLight } from "react-icons/pi";
import { PiBracketsRound } from "react-icons/pi";
import { BsDatabaseFill } from "react-icons/bs";
import { BiLogoJava, BiLogoAngular, BiLogoTypescript } from "react-icons/bi";
import { AiFillHtml5 } from "react-icons/ai";
import { BsTable } from "react-icons/bs";
import { GrSave } from "react-icons/gr";
import { HiViewGrid } from "react-icons/hi";
import "./styles.css";

const iconMap = {
  // languages
  py: <BiLogoPython className="node-icon" />,
  js: <BiLogoJavascript className="node-icon" />,
  java: <BiLogoJava className="node-icon" />,
  angular: <BiLogoAngular className="node-icon" />,
  ts: <BiLogoTypescript className="node-icon" />,
  html: <AiFillHtml5 className="node-icon" />,

  // db
  db: <BsDatabaseFill className="node-icon" />,
  table: <BsTable className="node-icon" />,
  storedProcedure: <GrSave className="node-icon" />,
  views: <HiViewGrid className="node-icon" />,
  sql: <PiFileSqlBold className="node-icon" />,

  // miscellaneous
  zip: <FaFileArchive className="node-icon" />,
  summary: <RiFilePaper2Fill className="node-icon" />,
  class: <PiBracketsCurlyLight className="node-icon" />,
  function: <PiBracketsRound className="node-icon" />,
};

const CustomNodeContent = (props) => {
  const iconComponent = iconMap[props.data.type] || null;
  const highlighted = props.data._highlighted ? "highlighted" : "";
  const newNode = props.data.isNew ? "newNode" : "";
  const searchedNode = props.data._searchResult ? "searchedNode" : "";

  return (
    <div className={`node-container ${highlighted} ${newNode} ${searchedNode}`}>
      <div className="node-details">
        <div className="node-content">
          {iconComponent}
          <div className="node-info">
            <p className="node-name">{props.data.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomNodeContent;
