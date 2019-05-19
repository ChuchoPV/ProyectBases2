import React from "react";
import $ from "jquery";
import { Table, Button } from "react-bootstrap";
import Anadir from "./añadirProducto";

function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
};

class Producto extends React.Component {
  state = {
    productos: []
  };

  delete = id => {
    $.ajax({
      url: "http://localhost/~chucho/phpBases2/deleteProducto.php",
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
      "http://localhost/~chucho/phpBases2/readProducto.php",
      function(products) {
        this.setState({
          productos: products.records
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
        {this.props.mode === "productos" && this.state.productos.length !== 0 ? (
          <Table style={{ width: 700 }} striped bordered hover>
            <thead>
              <th>ID</th>
              <th>Producto</th>
              <th>Precio</th>
              <th />
            </thead>
            <tbody>
              {this.state.productos.map(key => {
                return (
                  <tr>
                    <td>{key.idProducto}</td>
                    <td>{key.producto}</td>
                    <td>${ formatMoney(key.precio) }</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => {
                          var confirm = window.confirm(
                            "Seguro que desea eliminar este elemento"
                          );
                          if (confirm) {
                            this.delete(key.idProducto);
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
        {this.props.mode === "productosCrear" ? (
          <Anadir changeMode={this.props.changeMode} />
        ) : null}
      </div>
    );
  }
}

export default Producto;
