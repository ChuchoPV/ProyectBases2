import React from "react";
import $ from "jquery";
import { Table } from "react-bootstrap";

class Students extends React.Component {
  state = {
    students: []
  };

  componentDidMount() {
    this.serverRequest = $.get(
      "http://localhost/~chucho/phpBases2/readStudent.php",
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
      <Table style={{width : 700}} striped bordered hover>
        <thead>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
        </thead>
        <tbody>
            {this.state.students.map(key => {
                return(
                    <tr>
                        {console.log(key)}
                        <td>{key.id}</td>
                        <td>{key.nombre}</td>
                        <td>{key.apellido}</td>
                    </tr>
                );
            })}
        </tbody>
      </Table>
    );
  }
}

export default Students;
