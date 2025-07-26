import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AnimalDto } from '../../dto/animal.dto';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-details-animal',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './details-animal.html',
  styleUrl: './details-animal.scss',
})
export class DetailsAnimalComponent implements OnInit {
  animal: AnimalDto | undefined;
  backendUrl = 'http://localhost:3000';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const animalId = params.get('id');
      if (animalId) {
        this.auth.getAccessTokenSilently({
          authorizationParams: {
            audience: this.backendUrl,
            scope: 'openid profile email',
          },
        }).subscribe((accessToken) => {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
          this.http
            .get<AnimalDto>(`${this.backendUrl}/animaux/${animalId}`, { headers })
            .subscribe((animal) => {
              this.animal = animal;
            });
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/liste']);
  }
}