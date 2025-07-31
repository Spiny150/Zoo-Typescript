import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnclosDto } from '../../../api/model/enclosDto';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-details-enclos',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatListModule],
  templateUrl: './details-enclos.html',
  styleUrls: ['./details-enclos.scss'],
})
export class DetailsEnclosComponent implements OnInit {
  enclos: EnclosDto | undefined;
  backendUrl = 'http://localhost:3000';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const enclosId = params.get('id');
      if (enclosId) {
        this.auth.getAccessTokenSilently({
          authorizationParams: {
            audience: this.backendUrl,
            scope: 'openid profile email',
          },
        }).subscribe((accessToken) => {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
          this.http
            .get<EnclosDto>(`${this.backendUrl}/enclos/${enclosId}`, { headers })
            .subscribe((enclos) => {
              this.enclos = enclos;
            });
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/enclos']);
  }
}
