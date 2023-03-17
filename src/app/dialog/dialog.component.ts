import { Component, OnInit,Inject } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {
  modSuivis = ["Présentiel","En ligne"];
  inscriptionForm !: FormGroup;
  actionBtn : string = "Enregistrer";
  constructor(private formBuilder : FormBuilder,
     private api : ApiService, 
     @Inject(MAT_DIALOG_DATA) public editData: any,
     private dialogRef : MatDialogRef<DialogComponent>){}
  ngOnInit() : void {
    this.inscriptionForm = this.formBuilder.group({
        nomPrenoms : ['',Validators.required],
        telephone  : ['',Validators.required],
        email      : ['',Validators.required],
        formation  : ['',Validators.required],
        dateCall   : ['',Validators.required],
        modeSuivi  : ['',Validators.required],
        anneExp    : ['',Validators.required]
    })
    console.log(this.editData);
    if(this.editData){
      this.actionBtn = "Modifier";
      this.inscriptionForm.controls['nomPrenoms'].setValue(this.editData.nomPrenoms);
      this.inscriptionForm.controls['telephone'].setValue(this.editData.telephone);
      this.inscriptionForm.controls['email'].setValue(this.editData.email);
      this.inscriptionForm.controls['formation'].setValue(this.editData.formation);
      this.inscriptionForm.controls['dateCall'].setValue(this.editData.dateCall);
      this.inscriptionForm.controls['modeSuivi'].setValue(this.editData.modeSuivi);
      this.inscriptionForm.controls['anneExp'].setValue(this.editData.anneExp);
    } 
  }
  inscription(){
    if(!this.editData){
      if(this.inscriptionForm.valid){
        this.api.postInscription(this.inscriptionForm.value)
        .subscribe({
          next:(res)=>{
            alert("Inscription validé...");
            this.inscriptionForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Erreur d'inscription!!")
          }
        })
      }
    }else{
      console.log("Update");
      this.updateInscription();
    }

  }
  updateInscription(){
    this.api.putInscription(this.inscriptionForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Modifier........::::");
        this.inscriptionForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Erreur de Modification.........!");
      }
    })
  }

}
