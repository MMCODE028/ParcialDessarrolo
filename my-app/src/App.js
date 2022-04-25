import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';


const data = [

  {id:1, Name: "Proyecto Alcatraz", description: "Infraestructura", statep:"En ejecucion"},
  {id:2, Name: "Proyecto Grado1", description: "Infraestructura", statep:"En busca"},
  {id:3, Name: "Proyecto Grado2", description: "Infraestructura", statep:"Finalizado"},

];




class App extends React.Component{
  
  state={
    data: data,
    modalActualizar:false,
    modalInsertar:false,
    form: {
      id: "",
      Name:"",
      description:"",
      statep:"",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].Name = dato.Name;
        arreglo[contador].description = dato.description;
        arreglo[contador].statep = dato.statep;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };


  
  render(){

    return(
      
      <>
      <Container>
      <>
      <h1>Gestion De Proyectos</h1>
      </>
      <br />
      <Button color='primary'>Insertar Nuevo Proyecto</Button>
      <br/><br />
      
      <Table>
        <thead><tr><th>ID</th>
        <th>NOMBRE</th>
        <th>DESCRIPCION</th>
        <th>ESTADO</th>
        <th>Acciones</th></tr></thead>
        <tbody>
          {this.state.data.map((dato)=>(

            <tr key={dato.id}>
              <td>{dato.id}</td>
              <td>{dato.Name}</td>
              <td>{dato.description}</td>
              <td>{dato.statep}</td>
              <td><Button 
              color="primary"
              onClick={()=>this.mostrarModalActualizar(dato)}
              > 
                Editar
              </Button>{"  "}
              <Button color= "danger">Eliminar</Button></td>
            </tr>

        ))}
        </tbody>
      </Table>
  </Container>
  
  <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Name
              </label>
              <input
                className="form-control"
                name="Name"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Name}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                DESCRIPCION: 
              </label>
              <input
                className="form-control"
                name="description"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.description}
              />
            </FormGroup>

            
            <FormGroup>
              <label>
                Estado: 
              </label>
              <input
                className="form-control"
                name="statep"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.statep}
              />
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Proyecto</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Personaje: 
              </label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Anime: 
              </label>
              <input
                className="form-control"
                name="anime"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>     
      </>
    );  
  }
}

export default App;
