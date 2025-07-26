import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { EnclosDto } from '@api/model/enclosDto';
import { EnclosService } from '../../../api/api/enclos.service';
import { MatDialog } from '@angular/material/dialog';
import { AjoutEnclosDialogComponent } from '../../components/ajout-enclos-dialog/ajout-enclos-dialog';
import { CreateEnclosDto } from '@api/model/createEnclosDto';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-liste-enclos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './liste-enclos.html',
  styleUrl: './liste-enclos.scss',
})
export class ListeEnclosComponent implements OnInit {
  displayedColumns: string[] = ['name', 'capacity', 'type', 'action'];
  dataSource: MatTableDataSource<EnclosDto> = new MatTableDataSource<EnclosDto>();

  constructor(private enclosService: EnclosService, public dialog: MatDialog, private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    this.loadEnclos();
  }

  loadEnclos(): void {
    this.enclosService.enclosControllerFindAll().subscribe((enclos: EnclosDto[]) => {
      this.dataSource.data = enclos;
    });
  }

  openAddEnclosDialog(): void {
    const dialogRef = this.dialog.open(AjoutEnclosDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.auth.getAccessTokenSilently({
          authorizationParams: {
            audience: 'http://localhost:3000',
            scope: 'openid profile email',
          },
        }).subscribe((accessToken) => {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
          this.http.post<EnclosDto>('http://localhost:3000/enclos', result, { headers }).subscribe(() => {
            this.loadEnclos();
          });
        });
      }
    });
  }

  deleteEnclos(id: string): void {
    this.auth.getAccessTokenSilently({
      authorizationParams: {
        audience: 'http://localhost:3000',
        scope: 'openid profile email',
      },
    }).subscribe((accessToken) => {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
      this.http.delete<void>(`http://localhost:3000/enclos/${id}`, { headers }).subscribe(() => {
        this.loadEnclos();
      });
    });
  }
}