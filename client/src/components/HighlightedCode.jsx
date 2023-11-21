import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function HighlightedCode({ drawerContent }) {
  const codeString = `
import React from "react";
import uniquePropHOC from "./lib/unique-prop-hoc";

// this comment is here to demonstrate an extremely long line length, well beyond what you should probably allow in your own code, though sometimes you'll be highlighting code you can't refactor, which is unfortunate but should be handled gracefully

class Expire extends React.Component {
    constructor(props) {
        super(props);
        this.state = { component: props.children }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                component: null
            });
        }, this.props.time || this.props.seconds * 1000);
    }
    render() {
        return this.state.component;
    }
}
export default uniquePropHOC(["time", "seconds"])(Expire);
          `;
  return (
    <div>
      <SyntaxHighlighter language="javascript" style={a11yDark}>
        {drawerContent.functionCode}
      </SyntaxHighlighter>
    </div>
  );
}

// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// import { useEffect, useState } from "react";

// export default function HighlightedCode() {
//   const [codeString, setCodeString] = useState("");

//   useEffect(() => {
//     // Fetch the code from your backend
//     fetch("http://localhost:3000/send-code")
//       .then((response) => response.json())
//       .then((data) => {
//         // Set the code string from the response
//         setCodeString(data.code);
//       })
//       .catch((error) => console.error(error));
//   }, []);

//   return (
//     <div>
//       {codeString && (
//         <SyntaxHighlighter language="javascript" style={a11yDark}>
//           {codeString}
//         </SyntaxHighlighter>
//       )}
//     </div>
//   );
// }
