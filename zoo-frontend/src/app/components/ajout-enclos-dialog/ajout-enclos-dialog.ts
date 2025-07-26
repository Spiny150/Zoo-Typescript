import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CreateEnclosDto } from '@api/model/createEnclosDto';

@Component({
  selector: 'app-ajout-enclos-dialog',
  templateUrl: './ajout-enclos-dialog.html',
  styleUrls: ['./ajout-enclos-dialog.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ]
})
export class AjoutEnclosDialogComponent {
  newEnclos: CreateEnclosDto = {
    name: '',
    type: '',
    capacity: 0
  };

  constructor(
    public dialogRef: MatDialogRef<AjoutEnclosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.newEnclos);
  }
}
