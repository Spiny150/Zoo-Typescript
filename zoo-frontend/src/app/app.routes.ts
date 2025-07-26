import { Routes } from '@angular/router';
import { ListeAnimauxComponent } from './pages/liste-animaux/liste-animaux';
import { DetailsAnimalComponent } from './pages/details-animal/details-animal';
import { ListeEnclosComponent } from './pages/liste-enclos/liste-enclos';
import { HomePageComponent } from './pages/home-page/home-page';

export const routes: Routes = [
  { path: '', component: HomePageComponent }, // Route par défaut
  { path: 'liste', component: ListeAnimauxComponent },
  { path: 'details/:id', component: DetailsAnimalComponent },
  { path: 'enclos', component: ListeEnclosComponent },
];
