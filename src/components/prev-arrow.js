import { PiHandSwipeRightFill } from "react-icons/pi";
import React from "react"
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import ResponsiveSize from "../hooks/responsive-size";

const helpTooltip = (message, props) => (
  <Tooltip {...props}>
    {message}
  </Tooltip>
);

export default function PrevArrow(props) {
    const { onClick } = props;
    return (
      <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 250 }}
          overlay={helpTooltip("Previous Page")}
      >
      <Button
        onClick={onClick}
        className = "carousel-control-prev"
        aria-label="Previous"
        style={{fontSize: ResponsiveSize(2, "rem", 0.001, 500)}}
      >
        <span aria-hidden={true}><PiHandSwipeRightFill /></span>
      </Button>
      </OverlayTrigger>
    );
  }