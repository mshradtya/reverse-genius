const chartData = [
  {
    id: 1,
    parentId: "",
    name: "Source.zip",
    type: "zip",
  },
  {
    id: 2,
    parentId: 1,
    name: "Super Summary",
    type: "summary",
  },
  {
    id: 3,
    parentId: 2,
    name: "Python",
    type: "py",
  },
  {
    id: 4,
    parentId: 2,
    name: "JavaScript",
    type: "js",
  },
  {
    id: 5,
    parentId: 2,
    name: "SQL",
    type: "sql",
  },
  {
    id: 6,
    parentId: 3,
    name: "main.py",
    type: "py",
  },
  {
    id: 7,
    parentId: 3,
    name: "hello.py",
    type: "py",
  },
  {
    id: 8,
    parentId: 3,
    name: "test.py",
    type: "py",
  },
  {
    id: 9,
    parentId: 3,
    name: "script.py",
    type: "py",
  },
  {
    id: 10,
    parentId: 4,
    name: "script.jsdfasfadfafdafa",
    type: "js",
  },
  {
    id: 11,
    parentId: 4,
    name: "test.jsafafdafaafafaffa",
    type: "js",
  },
  {
    id: 12,
    parentId: 4,
    name: "main.jsafadfafdsfafaafaf",
    type: "js",
  },
  {
    id: 13,
    parentId: 4,
    name: "temp.jsfafafaffafaaf",
    type: "js",
  },
  {
    id: 14,
    parentId: 6,
    name: "Main",
    type: "pyClass",
  },
  {
    id: 15,
    parentId: 14,
    name: "printHello",
    type: "pyFunction",
  },
  {
    id: 16,
    parentId: 14,
    name: "sumOfTwo",
    type: "pyFunction",
  },
  {
    id: 17,
    parentId: 14,
    name: "printStars",
    type: "pyFunction",
  },
];

export default chartData;
