import React, {useState} from "react"
import { BsCaretRightFill } from "react-icons/bs";
import { Button, Modal } from "react-bootstrap"
import CloseButton from "./close-button";
import ResponsiveHeader from "./responsive-header";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import ResponsiveSize from "../hooks/responsive-size";

export default function MediaCover({title, cover, synopsis, slug}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return(
      <>
      <Button aria-label={`${title}`} className="view img-button media-preview m-2" onClick={handleShow}>
        <div aria-hidden={true}>
          <GatsbyImage
            className="d-block w-100 media-preview-image"
            image={getImage(cover)}
            alt={title}
          />
          <section className="m-3 media-preview-title">
            <ResponsiveHeader level={3} maxSize={1} minScreenSize={460}>
              {title} <br />
            </ResponsiveHeader>
          </section>
        </div>
      </Button>
      <Modal show={show} onHide={handleClose} centered scrollable>
        <Modal.Header className="justify-content-center">
          <Modal.Title style={{textAlign: "center", color: "rgb(255, 119, 0)"}}>
            <div style={{color: "rgb(255, 119, 0)"}}>
              <ResponsiveHeader level={1}>{title}</ResponsiveHeader>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: "justify", color: "rgb(255, 119, 0)"}}>
          <section>
            <GatsbyImage
              className="hover-shadow-card d-block w-100 mb-3"
              image={getImage(cover)}
              alt={title}
            />
            <article dangerouslySetInnerHTML={{ __html: synopsis }}></article>
          </section>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button style={{fontSize: ResponsiveSize(0.8, "rem", 0.001, 500)}} href={slug} target="_blank" rel="noreferrer">
              Go <BsCaretRightFill aria-hidden={true} />
          </Button>
          <CloseButton handleClose={handleClose} />
        </Modal.Footer>
      </Modal>
      </>
    )
  }