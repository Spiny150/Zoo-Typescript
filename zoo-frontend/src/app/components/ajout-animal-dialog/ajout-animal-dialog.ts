import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CreateAnimalDto } from '../../dto/create-animal.dto';

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
  ],
  templateUrl: './ajout-animal-dialog.html',
  styleUrl: './ajout-animal-dialog.scss',
})
export class AjoutAnimalDialogComponent {
  animal: CreateAnimalDto = { name: '', species: '', health: 100 };

  constructor(
    public dialogRef: MatDialogRef<AjoutAnimalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    this.dialogRef.close(this.animal);
  }
}