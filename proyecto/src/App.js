import React from "react";
import Paper from "@material-ui/core/Paper";
import { Button, Row } from "react-bootstrap";
import Students from "./Components/students.jsx";
import "./App.css";

class App extends React.Component {
  state = {
    mode: "null"
  };

  changeMode = mode => {
    this.setState({ mode });
  };

  render() {
    const { mode } = this.state;

    return (
      <div>
        {mode === "null" ? (
          <Paper
            style={{
              margin: "auto",
              marginTop: 150,
              width: 400,
              height: 200,
              textAlign: "center",
              paddingTop: 80
            }}
          >
            <div>
              <Button onClick={() => this.setState({ mode: "proveedores" })}>
                Proveedores
              </Button>{" "}
              &nbsp;
              <Button>Clientes</Button>&nbsp;
              <Button>Pedidos</Button>&nbsp;
            </div>
          </Paper>
        ) : null}
        {mode.includes("proveedores") ? (
          <div style={{ marginTop: 20, marginLeft: 40, marginRight: "auto" }}>
            <Row>
              <Button
                variant="info"
                onClick={() => {
                  if (mode === "proveedores") {
                    this.setState({ mode: "null" });
                  } else {
                    this.setState({ mode: "proveedores" });
                  }
                }}
              >
                Regresar
              </Button>{" "}
              &nbsp;
              {mode !== "proveedoresCrear" ? (
                <Button
                  onClick={() => this.setState({ mode: "proveedoresCrear" })}
                >
                  Añadir
                </Button>
              ) : null}
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Students changeMode={this.changeMode} mode={this.state.mode} />
            </Row>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
