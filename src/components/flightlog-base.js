import React, {useState} from "react";
import Layout from "./layout"
import { Modal, Form, Tab, Tabs, Accordion, Table, Badge } from "react-bootstrap";
import SettingsButton from "./settings-button";
import ResponsiveSize from "../hooks/responsive-size";
import ResponsiveHeader from "./responsive-header";
import CloseButton from "./close-button";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function SettingsWindow(props) {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
      <SettingsButton fontButtonSize={ResponsiveSize(0.8, "rem", 0.001, 500)} handleShow={handleShow} />
      <Modal show={show} onHide={handleClose} fullscreen={true} scrollable={true}>
      <Modal.Header className="justify-content-center">
        <Modal.Title style={{textAlign: "center", color: "#017BFF"}}>
          <ResponsiveHeader level={1} maxSize={2} minScreenSize={500}>Settings</ResponsiveHeader>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className="mb-3">
          <div className='align-items-center' style={{textAlign: 'center', color: "#017BFF"}}>
            <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>
              Table Background
            </ResponsiveHeader>
          </div>
          <Form.Select style={{color: "#017BFF"}} className="hover-shadow" id="table-background-selector" onChange={props.changeTableBackground} value={props.state.currentTableBackground}>
            {props.tableBackgroundOptions.map((value) => (<option key={value}>{value}</option>))}
          </Form.Select>
        </section>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <CloseButton handleClose={handleClose} />
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default class FlightLogBase extends React.Component {
    state = {
      currentLanguage: this.props.defaultLanguage,
      currentMode: this.props.defaultMode,
      currentTableBackground: this.props.defaultTableBackground
    }
  
    changeTableBackground = () => {
      var tableBackground = document.getElementById("table-background-selector").value;
      this.setState({currentTableBackground: tableBackground});
    }
  
    render() {
      var contents = this.props.compile(this.props.data)
      
      return(
        <Layout useCustomBackground={this.props.useCustomBackground} menuBarItems={[(<SettingsWindow state={this.state} languageOptions={contents.languageOptions} modeOptions={this.props.modeOptions} tableBackgroundOptions={this.props.tableBackgroundOptions} changeLanguage={this.changeLanguage} changeMode={this.changeMode} changeTableBackground={this.changeTableBackground} changePageSize={this.changePageSize} />)]} showMenuBar={true}>
          <div style={this.props.tableBackgrounds[this.state.currentTableBackground]}>
            <div className={`m-3`} style={{textAlign: 'center'}}>
            <section lang={contents.currentLanguageCode} className="mb-3">
              <Tabs
                defaultActiveKey={Object.keys(this.props.videos).length > 0 ? "videos" : (Object.keys(contents.images).length > 0 ? "photos" : "flightlogs")}
              >
                <Tab eventKey="videos" title="Videos" disabled={!(Object.keys(this.props.videos).length > 0)}>
                  <section className="py-3 flightlog-main">
                      <section className="mb-3" style={{textAlign: "center"}}>
                        <ResponsiveHeader level={1} maxSize={2} minScreenSize={800}>{contents.metadataItems.childMarkdownRemark.frontmatter.title}</ResponsiveHeader>
                        <Badge hidden={!contents.metadataItems.childMarkdownRemark.frontmatter.retired}>Historical</Badge>
                      </section>
                      <Accordion className="mb-3" flush>
                      {
                        Object.keys(this.props.videos).length > 0 ?
                        ((Object.keys(this.props.videos).sort()).reverse()).map((date) => (
                          <div className="m-3" key={date}>
                            <Accordion.Item eventKey={date}>
                              <Accordion.Header className="hover-shadow-card bold-text justify-content-center" style={{textAlign: "center"}}>
                                <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>
                                  {`${date}`}
                                </ResponsiveHeader>
                              </Accordion.Header>
                              <Accordion.Body>
                                {
                                  this.props.videos[date].map((videoID, index) => (
                                    <div className={`m-3 tablet-display-${index % 2 === 0 ? "blue" : "pink"}`}>
                                      <div className="tablet-display-body">
                                        <div className="tablet-display-screen">
                                          <iframe title={videoID} width="100%" height="480" src={`https://www.youtube.com/embed/${videoID}`}></iframe>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                }
                              </Accordion.Body>
                            </Accordion.Item>
                          </div>
                        )) :
                        <div></div>
                      }
                    </Accordion>
                  </section>
                </Tab>
                <Tab eventKey="photos" title="Photos" disabled={!(Object.keys(contents.images).length > 0)}>
                  <section className="py-3 flightlog-main">
                    <section className="mb-3" style={{textAlign: "center"}}>
                      <ResponsiveHeader level={1} maxSize={2} minScreenSize={800}>{contents.metadataItems.childMarkdownRemark.frontmatter.title}</ResponsiveHeader>
                      <Badge hidden={!contents.metadataItems.childMarkdownRemark.frontmatter.retired}>Historical</Badge>
                    </section>
                    <Accordion className="mb-3" flush>
                      {
                        Object.keys(contents.images).length > 0 ?
                        ((Object.keys(contents.images).sort()).reverse()).map((date) => (
                          <div className="m-3" key={date}>
                            <Accordion.Item eventKey={date}>
                              <Accordion.Header className="hover-shadow-card bold-text justify-content-center" style={{textAlign: "center"}}>
                                <ResponsiveHeader level={2} maxSize={1.5} minScreenSize={500}>
                                  {`${date}`}
                                </ResponsiveHeader>
                              </Accordion.Header>
                              <Accordion.Body>
                                <ImageList cols={3}>
                                  {contents.images[date].map((image) => (
                                    <ImageListItem key={`${date} ${image.name}`}>
                                      <img
                                        className="album-photo"
                                        src={image.publicURL}
                                        alt={`${date} ${image.name}`}
                                      />
                                    </ImageListItem>
                                  ))}
                                </ImageList>
                              </Accordion.Body>
                            </Accordion.Item>
                          </div>
                        )) :
                        <div></div>
                      }
                    </Accordion>
                  </section>
                </Tab>
                <Tab eventKey="flightlogs" title="Flight Logs" disabled={!(this.props.flightLogs.length > 0)}>
                  <section className="py-3 flightlog-main">
                      <section className="mb-3" style={{textAlign: "center"}}>
                        <ResponsiveHeader level={1} maxSize={2} minScreenSize={800}>{contents.metadataItems.childMarkdownRemark.frontmatter.title}</ResponsiveHeader>
                        <Badge hidden={!contents.metadataItems.childMarkdownRemark.frontmatter.retired}>Historical</Badge>
                      </section>
                      <Table>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Flight Number</th>
                            <th>Aircraft Registration</th>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.props.flightLogs.length > 0 ?
                            this.props.flightLogs.map((item) => (
                              <tr>
                                <td>{item["date"]}</td>
                                <td>{item["number"]}</td>
                                <td>{item["tail"]}</td>
                                <td>{item["from"]}</td>
                                <td>{item["to"]}</td>
                                <td>{item["status"]}</td>
                              </tr>
                            )) :
                            <tr></tr>
                          }
                        </tbody>
                      </Table>
                  </section>
                </Tab>
              </Tabs>
            </section>
            </div>
          </div>
        </Layout>
      )
    }
}
