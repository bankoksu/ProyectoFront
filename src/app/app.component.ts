import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { EstadosService } from './services/estados/estados.service';
import { PaisesService } from './services/paises/paises.service';
import { PersonaService } from './services/persona/persona.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  personaForm! : FormGroup;
  paises : any;
  estados:any;
  personas :any;

constructor(
  public fb: FormBuilder,
  public estadoService: EstadosService,
  public paisesService : PaisesService,
  public personaService : PersonaService
){


}

ngOnInit(): void {

  console.log("estoy en el principio del init");
  this.personaForm = this.fb.group({
    id:[''],
    nombre : ['', Validators.required],
    apellido: ['', Validators.required],
    edad : ['', Validators.required],
    pais : ['', Validators.required],
    estado : ['', Validators.required]
  });;

  

  this.paisesService.getAllPaises().subscribe(resp =>{
      this.paises = resp;
  },
  error => {console.error(error) }
  );

  this.personaService.getAllPersonas().subscribe(resp=> {
    this.personas = resp;
  },
    error=> { console.error(error)}
);

  
  this.personaForm.get('pais')?.valueChanges.subscribe(value => {
    if (value && value.id) {  // Verifica si 'value' y 'value.id' no son nulos
      this.estadoService.getAllEstadosByPais(value.id).subscribe(resp => {
        this.estados = resp;
      },
      error => {
        console.error(error);
      });
    }
  })
  

}

guardar(): void{
  this.personaService.savePersona(this.personaForm.value).subscribe(resp =>{
    this.personaForm.reset();
    this.personas = this.personas.filter((persona :any )=> resp.id !== persona.id);
    this.personas.push(resp);

  },
  error=> {console.error(error)}
  )
}

cargarEstadosPorPaisesId(event : any){

  this.estadoService.getAllEstadosByPais(event.target.value).subscribe(resp =>{
      this.estados =resp;
  },
  error=>{console.error(error)}
  );
}

eliminar(persona : any){
  this.personaService.deletePersona(persona.id).subscribe(resp=>{
    if(resp===true){
      this.personas.pop(persona);
    }
  })
}

editar(persona : any){
  this.personaForm.setValue({
    id:persona.id,
    nombre :persona.nombre,
    apellido:persona.apellido,
    edad :persona.edad,
    pais :persona.pais ,
    estado : persona.estado,

 })

}
  
  
}


