import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { timestamp } from 'rxjs/operators';

export interface TaskI {
    id?: string; // El signo ? es porque se trata de un atributo opcional
    actividad: string;
    dia: Date;
   }
