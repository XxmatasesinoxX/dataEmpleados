import './App.css';
import{useState} from "react";
import axios from "axios";     
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Swal from 'sweetalert2'


function App() {

  const[nombre,setNombre] = useState("");
  const[edad,setEdad] = useState("");
  const[cedula,setCedula] = useState("");
  const[cargo,setCargo] = useState("");
  const[fIngreso,setIngreso] = useState("");
  const[fSalida,setSalida] = useState("");
  const[observacion,setObservacion] = useState("");

  const[id,setId] = useState(0);

  const[editar,setEditar] = useState(false);

  const[empleadosList,setEmpleados]= useState([]);

  const add =()=>{
    axios.post("http://localhost:3001/create",{
      nombre:nombre,
      edad:edad,
      cedula:cedula,
      cargo:cargo,
      fIngreso:fIngreso,
      fSalida:fSalida,
      observacion:observacion
    }).then(()=>{
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro exitoso!!!</strong>",
        html: "<i>El empleado <strong>"+nombre+"</strong> fue registrado con exito!</i>",
        icon: 'success',
        timer:1000
      })
    });
  }
  const update =()=>{
    axios.put("http://localhost:3001/update",{
      id:id,
      nombre:nombre,
      edad:edad,
      cedula:cedula,
      cargo:cargo,
      fIngreso:fIngreso,
      fSalida:fSalida,
      observacion:observacion
    }).then(()=>{
      getEmpleados();
      limpiarCampos();
      setEditar(false)
    });
  }
  const limpiarCampos =()=>{
    setNombre("");
    setEdad("");
    setCedula("");
    setCargo("");
    setIngreso("");
    setSalida("");
    setObservacion("");
    setEditar("false")
  }

  const editarEmpleado = (val)=>{
    setEditar(true);
    setNombre(val.nombre)
    setEdad(val.edad)
    setCedula(val.cedula)
    setCargo(val.cargo)
    setIngreso(val.ingreso)
    setSalida(val.salida)
    setObservacion(val.observacion)
    setId(val.id)
  }
  const getEmpleados =()=>{
    axios.get("http://localhost:3001/empleados").then((response)=>{
      setEmpleados(response.data);
    });
  }  
  return (
    <div className="container">
    
    <div className="card text-center">
  <div className="card-header">
            GESTION DE EMPLEADOS
  </div>
  <div className="card-body">
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Nombre:</span>
      <input type="text" 
      onChange={(event)=>{
        setNombre(event.target.value);
      }}
       className="form-control" value={nombre} placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Edad:</span>
      <input type="number" 
              onChange={(event)=>{
                setEdad(event.target.value);
              }}
       className="form-control" value={edad} placeholder="Ingrese la edad" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">cedula:</span>
      <input type="number" 
        onChange={(event)=>{
          setCedula(event.target.value);
        }}
       className="form-control"value={cedula}  placeholder="Ingrese la cedula" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Cargo:</span>
      <input type="text" 
                onChange={(event)=>{
                  setCargo(event.target.value);
                }}
       className="form-control" value={cargo} placeholder="Ingrese el cargo" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Fecha de ingreso:</span>
      <input type="date" 
        onChange={(event)=>{
          setIngreso(event.target.value);
        }}
       className="form-control" value={fIngreso} placeholder="Ingrese la fecha" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Fecha de salida:</span>
      <input type="date" 
        onChange={(event)=>{
          setSalida(event.target.value);
        }}
       className="form-control" value={fSalida} placeholder="Ingrese la fecha" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Observaciones:</span>
      <input type="text" 
                onChange={(event)=>{
                  setObservacion(event.target.value);
                }}
       className="form-control" value={observacion} placeholder="Ingrese la observacion" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>
  </div>

  <div className="card-footer text-body-secondary">
  <div className="btn-group" role="group" aria-label="Basic example">
    {
      editar==true?
      <div>
      <button type="button" className="btn btn-warning m-2" onClick={update}>Actualizar</button>
      <button type="button" className="btn btn-danger m-2" onClick={limpiarCampos}>Cancelar</button>
      </div>
      :<button type="button" className="btn btn-success m-2" onClick={add}>Registrar</button>
    }
        <button type="button" className="btn btn-success m-2" onClick={getEmpleados}>Lista de empleados</button>
      </div>
  </div>

</div>
<table className="table table-striped">
<thead>
    <tr>
    <th scope="col">Id</th>
      <th scope="col">Nombre</th>
      <th scope="col">Edad</th>
      <th scope="col">Cedula</th>
      <th scope="col">Cargo</th>
      <th scope="col">F. Ingreso</th>
      <th scope="col">F. Salida</th>
      <th scope="col">Observación</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
  {
              empleadosList.map((val,key)=>{
                return <tr key={val.id}>
                    <td>{val.id}</td>
                    <th scope="row">{val.nombre}</th>
                    <td>{val.edad}</td>
                    <td>{val.cedula}</td>
                    <td>{val.cargo}</td>
                    <td>{val.ingreso}</td>
                    <td>{val.salida}</td>
                    <td>{val.observacion}</td>
                    <td>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button"
        onClick={()=>{
          editarEmpleado(val);
        }}
        className="btn btn-info">Editar</button>
        <button type="button" className="btn btn-danger">Eliminar</button>
      </div>
      </td>
                 </tr>
              })
            }

  </tbody>
</table>
    </div>
  );

}


export default App;
