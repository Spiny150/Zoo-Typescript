import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CreateAnimalDto } from '../../dto/create-animal.dto';
import { EnclosDto } from '../../../api/model/enclosDto';
import { EnclosService } from '../../../api/api/enclos.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-ajout-animal-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './ajout-animal-dialog.html',
  styleUrl: './ajout-animal-dialog.scss',
})
export class AjoutAnimalDialogComponent implements OnInit {
  animal: CreateAnimalDto = { name: '', species: '', health: 100 };
  enclos: EnclosDto[] = [];
  selectedEnclos: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<AjoutAnimalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private enclosService: EnclosService
  ) {}

  ngOnInit(): void {
    this.enclosService
      .enclosControllerFindAll()
      .subscribe((enclos) => (this.enclos = enclos));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    if (this.selectedEnclos) {
      this.animal.enclosId = this.selectedEnclos;
    }
    this.dialogRef.close(this.animal);
  }
}