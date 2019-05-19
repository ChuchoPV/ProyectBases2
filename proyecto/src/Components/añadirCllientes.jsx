import React from "react";
import $ from "jquery";
import { Table, Button } from "react-bootstrap";

const INITIAL_STATE = {
  idCliente: "",
  idEmpresa: "",
  nombre: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  correo: "",
  telefono: ""
};

class Añadir extends React.Component {
  state = {
    ...INITIAL_STATE
  };

  post = e => {
    // data in the form
    var form_data = {
      idCliente: this.state.idCliente,
      idEmpresa: this.state.idEmpresa,
      nombre: this.state.nombre,
      apellidoPaterno: this.state.apellidoPaterno,
      apellidoMaterno: this.state.apellidoMaterno,
      correo: this.state.correo,
      telefono: this.state.telefono
    };

    // submit form data to api
    $.ajax({
      url: "http://localhost/~chucho/phpBases2/createCliente.php",
      type: "POST",
      data: JSON.stringify(form_data),
      success: function(response) {
        this.setState({ ...INITIAL_STATE });
        alert(response["message"]);
        this.props.changeMode("clientes");
        window.location.reload();
      }.bind(this),
      error: function(xhr, resp, text) {
        // show error in console
        console.log(xhr, resp, text);
        alert(text);
      }
    });

    e.preventDefault();
  };

  render() {
    const disable =
      this.state.idCliente === "" ||
      this.state.idEmpresa === "" ||
      this.state.nombre === "" ||
      this.state.apellidoPaterno === "" ||
      this.state.apellidoMaterno === "" ||
      this.state.correo === "" ||
      this.state.telefono === "";

    return (
      <div>
        <Table style={{ width: 400 }} striped bordered hover>
          <tbody>
            <tr>
              <td>ID Cliente</td>
              <td>
                <input
                  type="text"
                  value={this.state.idCliente}
                  onChange={e => {
                    if (/^-?\d*$/.test(e.target.value)) {
                      this.setState({ idCliente: e.target.value });
                    }
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>ID Empresa</td>
              <td>
                <input
                  type="text"
                  value={this.state.idEmpresa}
                  onChange={e => {
                    if (/^-?\d*$/.test(e.target.value)) {
                      this.setState({ idEmpresa: e.target.value });
                    }
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Nombre</td>
              <td>
                <input
                  type="text"
                  value={this.state.nombre}
                  onChange={e => {
                    this.setState({ nombre: e.target.value });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Apellido Paterno</td>
              <td>
                <input
                  type="text"
                  value={this.state.apellidoPaterno}
                  onChange={e => {
                    this.setState({ apellidoPaterno: e.target.value });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Apellido Materno</td>
              <td>
                <input
                  type="text"
                  value={this.state.apellidoMaterno}
                  onChange={e => {
                    this.setState({ apellidoMaterno: e.target.value });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Correo</td>
              <td>
                <input
                  type="text"
                  value={this.state.correo}
                  onChange={e => {
                    this.setState({ correo: e.target.value });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Teléfono</td>
              <td>
                <input
                  type="text"
                  value={this.state.telefono}
                  onChange={e => {
                    this.setState({ telefono: e.target.value });
                  }}
                />
              </td>
            </tr>
          </tbody>
        </Table>
        <Button disabled={disable} onClick={this.post}>
          Añadir
        </Button>
      </div>
    );
  }
}

export default Añadir;
