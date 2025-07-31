import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AjoutAnimalDialogComponent } from '../../components/ajout-animal-dialog/ajout-animal-dialog';
import { AnimalDto } from '../../dto/animal.dto';
import { CreateAnimalDto } from '../../dto/create-animal.dto';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-liste-animaux',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule, // Ajout du module de dialog
  ],
  templateUrl: './liste-animaux.html',
})
export class ListeAnimauxComponent implements OnInit {
  displayedColumns: string[] = ['name', 'species', 'health', 'enclos', 'action'];
  dataSource: MatTableDataSource<AnimalDto> =
    new MatTableDataSource<AnimalDto>(); // On déclare un tableau de type AnimalDto

  backendUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private dialog: MatDialog, private auth: AuthService) {} // Ajout du dialog et AuthService

  ngOnInit(): void {
    this.loadAnimaux();
  }

  loadAnimaux(): void {
    this.http
      .get<AnimalDto[]>(`${this.backendUrl}/animaux`)
      .subscribe((animaux) => {
        this.dataSource.data = animaux;
      });
  }

  // Fonction pour ouvrir le dialog d'ajout d'animal
  ajouterAnimal() {
    this.dialog
      .open(AjoutAnimalDialogComponent, {
        height: '400px',
        width: '400px',
      })
      .afterClosed()
      .subscribe((result: CreateAnimalDto) => {
        console.log(
          'La modale a ete fermee avec les donnees suivantes : ',
          result
        );

        if (result) {
          // Si l'utilisateur a cliqué sur "Ajouter"

          this.auth.getAccessTokenSilently({
            authorizationParams: {
              audience: this.backendUrl,
              scope: 'openid profile email',
            },
          }).subscribe((accessToken) => {
            const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
            // On envoie le nouvel animal à l'API qui devrait le creer et le renvoyer
            this.http
              .post<AnimalDto>(`${this.backendUrl}/animaux`, result, { headers })
              .subscribe({
                next: (animal) => {
                  console.log("L'animal a été ajouté : ", animal);
                  this.dataSource.data = [...this.dataSource.data, animal];
                },
                error: (error) => {
                  if (error.status === 400) {
                    alert(error.error.message);
                  } else {
                    alert('Une erreur est survenue.');
                  }
                }
              });
          });
        }
      });
  }

  relacherAnimal(id: number) {
    this.auth.getAccessTokenSilently({
      authorizationParams: {
        audience: this.backendUrl,
        scope: 'openid profile email',
      },
    }).subscribe((accessToken) => {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
      this.http
        .delete<AnimalDto>(`${this.backendUrl}/animaux/${id}`, { headers })
        .subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(
            (animal) => animal.id !== id
          );
        });
    });
  }

  soignerAnimal(id: number) {
    this.auth.getAccessTokenSilently({
      authorizationParams: {
        audience: this.backendUrl,
        scope: 'openid profile email',
      },
    }).subscribe((accessToken) => {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
      this.http
        .get<AnimalDto>(`${this.backendUrl}/animaux/soigner/${id}`, { headers })
        .subscribe((updatedAnimal) => {
          console.log('Animal soigné : ', updatedAnimal);
          // Mettre à jour l'animal dans la liste
          this.dataSource.data = this.dataSource.data.map(animal =>
            animal.id === updatedAnimal.id ? updatedAnimal : animal
          );
        });
    });
  }
}
