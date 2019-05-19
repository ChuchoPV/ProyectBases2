import React from "react";
import $ from "jquery";
import { Table, Button, Alert } from "react-bootstrap";
import Anadir from "./añadirCllientes";

class Clientes extends React.Component {
  state = {
    clientes: []
  };

  delete = id => {
    $.ajax({
      url: "http://localhost/~chucho/phpBases2/deleteClientes.php",
      type: "POST",
      data: JSON.stringify({ id: id }),
      success: function(response) {
        alert(response["message"]);
        window.location.reload();
      },
      error: function(xhr, resp, text, response) {
        // show error in console
        console.log(xhr, resp, text);
        alert(response["message"], text);
      }
    });
  };

  componentDidMount() {
    this.serverRequest = $.get(
      "http://localhost/~chucho/phpBases2/readClientes.php",
      function(products) {
        this.setState({
          clientes: products.records
        });
      }.bind(this)
    );
  }

  // on unmount, kill product fetching in case the request is still pending
  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    return (
      <div>
        {this.state.clientes.length === 0 ? (
          <Alert variant="info">
            No hay registros. Probablemente no tenga acceso
          </Alert>
        ) : null}
        {this.props.mode === "clientes" && this.state.clientes.length !== 0 ? (
          <Table style={{ width: 700 }} striped bordered hover>
            <thead>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th />
            </thead>
            <tbody>
              {this.state.clientes.map(key => {
                return (
                  <tr>
                    <td>{key.idCliente}</td>
                    <td>{key.nombre}</td>
                    <td>{key.apellidoPaterno}</td>
                    <td>{key.apellidoMaterno}</td>
                    <td>{key.correo}</td>
                    <td>{key.telefono}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => {
                          var confirm = window.confirm(
                            "Seguro que desea eliminar este elemento"
                          );
                          if (confirm) {
                            this.delete(key.idCliente);
                          }
                        }}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : null}
        {this.props.mode === "clientesCrear" ? (
          <Anadir changeMode={this.props.changeMode} />
        ) : null}
      </div>
    );
  }
}

export default Clientes;
