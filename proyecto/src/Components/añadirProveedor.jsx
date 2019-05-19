import React from "react";
import $ from "jquery";
import { Table, Button } from "react-bootstrap";

const INITIAL_STATE = {
  idProveedor: "",
  nombre: "",
  pais: "",
  direccion : ""
};

class Añadir extends React.Component {
  state = {
    ...INITIAL_STATE
  };

  post = e => {
    // data in the form
    var form_data = {
      idProveedor: this.state.idProveedor,
      nombre: this.state.nombre,
      pais: this.state.pais,
      direccion : this.state.direccion
    };

    // submit form data to api
    $.ajax({
      url: "http://localhost/~chucho/phpBases2/createProveedores.php",
      type: "POST",
      data: JSON.stringify(form_data),
      success: function(response) {
        this.setState({ ...INITIAL_STATE });
        alert(response["message"]);
        this.props.changeMode("proveedores");
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
      this.state.idProveedor === "" ||
      this.state.nombre === "" ||
      this.state.pais === "" ||
      this.state.direccion === "" ;

    return (
      <div>
        <Table style={{ width: 400 }} striped bordered hover>
          <tbody>
            <tr>
              <td>ID</td>
              <td>
                <input
                  type="text"
                  value={this.state.idProveedor}
                  numeric
                  onChange={e => {
                    if (/^-?\d*$/.test(e.target.value)) {
                      this.setState({ idProveedor: e.target.value });
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
              <td>País</td>
              <td>
                <input
                  type="text"
                  value={this.state.pais}
                  onChange={e => {
                      this.setState({ pais: e.target.value });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Dirección</td>
              <td>
                <input
                  type="text"
                  value={this.state.direccion}
                  onChange={e => {
                      this.setState({ direccion: e.target.value });
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
