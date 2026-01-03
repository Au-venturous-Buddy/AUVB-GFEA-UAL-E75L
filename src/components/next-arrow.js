import { PiHandSwipeLeftFill } from "react-icons/pi";
import React from "react"
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import ResponsiveSize from "../hooks/responsive-size";

const helpTooltip = (message, props) => (
  <Tooltip {...props}>
    {message}
  </Tooltip>
);

export default function NextArrow(props) {
    const { onClick } = props;
    return (
      <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 250 }}
          overlay={helpTooltip("Next Page")}
      >
      <Button
        onClick={onClick}
        className = "carousel-control-next"
        aria-label="Next"
        style={{fontSize: ResponsiveSize(2, "rem", 0.001, 500)}}
      >
        <span aria-hidden={true}><PiHandSwipeLeftFill /></span>
      </Button>
      </OverlayTrigger>
    );
  }