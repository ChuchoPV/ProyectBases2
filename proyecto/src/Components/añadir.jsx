import React from "react";
import $ from "jquery";
import { Table, Button } from "react-bootstrap";

const INITIAL_STATE = {
  id: "",
  nombre: "",
  apellido: ""
};

class Añadir extends React.Component {
  state = {
    ...INITIAL_STATE
  };

  post = e => {
    // data in the form
    var form_data = {
      id: this.state.id,
      nombre: this.state.nombre,
      apellido: this.state.apellido
    };

    // submit form data to api
    $.ajax({
      url: "http://localhost/~chucho/phpBases2/createStudent.php",
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
      this.state.id === "" ||
      this.state.nombre === "" ||
      this.state.apellido === "";
    return (
      <div>
        <Table style={{ width: 400 }} striped bordered hover>
          <tbody>
            <tr>
              <td>ID</td>
              <td>
                <input
                  type="text"
                  value={this.state.id}
                  numeric
                  onChange={e => {
                    if (/^-?\d*$/.test(e.target.value)) {
                      this.setState({ id: e.target.value });
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
              <td>Apellido</td>
              <td>
                <input
                  type="text"
                  value={this.state.apellido}
                  onChange={e => {
                      this.setState({ apellido: e.target.value });
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
