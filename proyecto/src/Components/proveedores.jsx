import React from "react";
import $ from "jquery";
import { Table, Button } from "react-bootstrap";
import Anadir from "./añadirProveedor.jsx";

class Students extends React.Component {
  state = {
    students: []
  };

  delete = id => {
    $.ajax({
      url: "http://localhost/~chucho/phpBases2/deleteProveedores.php",
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
      "http://localhost/~chucho/phpBases2/readProveedores.php",
      function(products) {
        this.setState({
          students: products.records
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
        {this.state.students.length !== 0 &&
        this.props.mode === "proveedores" ? (
          <Table style={{ width: 700 }} striped bordered hover>
            <thead>
              <th>ID</th>
              <th>Nombre</th>
              <th>País</th>
              <th>Dirección</th>
              <th />
            </thead>
            <tbody>
              {this.state.students.map(key => {
                return (
                  <tr>
                    <td>{key.idProveedor}</td>
                    <td>{key.nombre}</td>
                    <td>{key.pais}</td>
                    <td>{key.direccion}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => {
                          var confirm = window.confirm(
                            "Seguro que desea eliminar este elemento"
                          );
                          if (confirm) {
                            this.delete(key.idProveedor);
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
        {this.props.mode === "proveedoresCrear" ? (
          <Anadir changeMode={this.props.changeMode} />
        ) : null}
      </div>
    );
  }
}

export default Students;
