import React from "react";
import { graphql } from "gatsby";
import FlightLogBase from "../components/flightlog-base"
import flightLogs from "../assets/flightlogs.json";
import tableBackgrounds from "../assets/table-backgrounds.json";
import videos from "../assets/videos.json";

function compileComicStrip(data) {
  var metadataItems = null;
  var images = {};
  var currentLanguageCode = "en";
  for(var i = 0; i < data.allFile.edges.length; i++) {
    var nodeItem = data.allFile.edges[i].node
    var parentFolder = nodeItem.relativeDirectory.split("/")[nodeItem.relativeDirectory.split("/").length - 1]
    if(nodeItem.relativeDirectory.includes("images") && [".png", ".PNG"].includes(nodeItem.ext)) {
      if(!(parentFolder in images)) {
        images[parentFolder] = [];
      }
      images[parentFolder].push(nodeItem);
    }
    else if(nodeItem.ext === ".md" && nodeItem.name === "index") {
      metadataItems = nodeItem;
    }
  }

  return {
    currentLanguageCode,
    metadataItems,
    images
  }
}

export default function FlightLog(props) {
  const tableBackgroundOptions = Object.keys(tableBackgrounds);

  return(
    <FlightLogBase 
      data={props.data}
      flightLogs={flightLogs}
      videos={videos}
      tableBackgroundOptions={tableBackgroundOptions}
      defaultTableBackground={tableBackgroundOptions[0]}
      tableBackgrounds={tableBackgrounds}
      defaultLanguage="English"
      compile={compileComicStrip}
    />
  )
}

export const query = graphql`
  query {
    allFile(
      filter: {relativeDirectory: {regex: "/assets/*/"}}
      sort: {relativePath: ASC}
    ) {
      edges {
        node {
          name
          ext
          relativeDirectory
          childMarkdownRemark {
            frontmatter {
              title
              retired
            }
          }
          publicURL
        }
      }
    }
  }
`