import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import dataSeed from "../dataSeed/dataSeed";
import ToastsContext from "../../context/ToastsContext";
import { ToastType, ToastTemplate } from "../interfaces/interfaces";
import "./_HomePage.scss";

const HomePage: React.FC = (): JSX.Element => {
  const { saveToast } = useContext(ToastsContext);

  const handleClick = (event: any) => {
    dataSeed();
    saveToast(ToastType.success, ToastTemplate.seeded);
  };

  return (
    <div className="homepage">
      <div className="topleft">
        <NavLink to="/products">Warehouse management</NavLink>
      </div>
      <div className="middle">
        <h1 className="d-md-none">IN STOCK</h1>
        <h1 className="d-none d-md-block d-lg-none display-4">IN STOCK</h1>
        <h1 className="d-none d-lg-block display-1">IN STOCK</h1>
        <hr />
        <p>Warehouse management system</p>
        <Container className="my-5">
          <Row>
            <Col lg="4">
              <h6 className="normal-font-weight">ABOUT</h6>
              <p>
                Project created for demo purposes only with{" "}
                <a
                  href="https://www.npmjs.com/package/react-router"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React
                </a>
                ,
                <a
                  href="https://www.npmjs.com/package/react-router"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TypeScript
                </a>{" "}
                and
                <a
                  href="https://www.npmjs.com/package/react-router"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React Bootstrap
                </a>
                .
              </p>
            </Col>
            <Col lg="4">
              <h6 className="normal-font-weight">DONE</h6>
              <p>
                Routing with
                <a
                  href="https://www.npmjs.com/package/react-router"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React router
                </a>
                .
                <br /> Charts with
                <a
                  href="https://www.highcharts.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Highcharts
                </a>
                .
                <br /> Custom notification system.
                <br /> Custom color theme applied.
                <br />
              </p>
            </Col>
            <Col lg="4">
              <h6 className="normal-font-weight">MORE</h6>
              <p>
                Localstorage used as database. <br />
                Sass used for customizing UI. <br />
                With React components system.
              </p>
            </Col>
          </Row>
        </Container>

        <Button onClick={handleClick} className="mr-5-md">
          Seed Data
        </Button>
        <NavLink to="/products" className="btn btn-link">
          Warehouse management demo
        </NavLink>
      </div>
      <div className="bottomleft">
        <p>
          <a href="https://github.com/elvyra">More</a>
        </p>
      </div>
    </div>
  );
};

export default HomePage;
