export * from './animaux.service';
import { AnimauxService } from './animaux.service';
export * from './app.service';
import { AppService } from './app.service';
export * from './enclos.service';
import { EnclosService } from './enclos.service';
export const APIS = [AnimauxService, AppService, EnclosService];
