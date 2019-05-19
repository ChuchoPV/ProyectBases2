import React from "react";
import $ from "jquery";
import { Table, Button } from "react-bootstrap";

const INITIAL_STATE = {
  idProducto: "",
  idProveedor: "",
  producto: "",
  precio : ""
};

class Añadir extends React.Component {
  state = {
    ...INITIAL_STATE
  };

  post = e => {
    // data in the form
    var form_data = {
      idProducto: this.state.idProducto,
      idProveedor: this.state.idProveedor,
      producto: this.state.producto,
      precio : this.state.precio
    };

    // submit form data to api
    $.ajax({
      url: "http://localhost/~chucho/phpBases2/createProducto.php",
      type: "POST",
      data: JSON.stringify(form_data),
      success: function(response) {
        this.setState({ ...INITIAL_STATE });
        alert(response["message"]);
        this.props.changeMode("productos");
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
      this.state.idProducto === "" ||
      this.state.idProveedor === "" ||
      this.state.producto === "" ||
      this.state.precio === "" ;

    return (
      <div>
        <Table style={{ width: 400 }} striped bordered hover>
          <tbody>
            <tr>
              <td>ID Prodcuto</td>
              <td>
                <input
                  type="text"
                  value={this.state.idProducto}
                  numeric
                  onChange={e => {
                    if (/^-?\d*$/.test(e.target.value)) {
                      this.setState({ idProducto: e.target.value });
                    }
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>ID Proveedor</td>
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
              <td>Producto</td>
              <td>
                <input
                  type="text"
                  value={this.state.producto}
                  onChange={e => {
                    this.setState({ producto: e.target.value });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Precio</td>
              <td>
                <input
                  type="text"
                  value={this.state.precio}
                  onChange={e => {
                    if (/^-?\d*[.,]?\d*$/.test(e.target.value)) {
                      this.setState({ precio: e.target.value });
                    }
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
