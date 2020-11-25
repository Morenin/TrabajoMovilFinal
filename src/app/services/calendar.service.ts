import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../interfaces/intefaces';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private eventsCollection: AngularFirestoreCollection<Task>;
  private events: Observable<Task[]>;

  constructor(db: AngularFirestore) {

    this.eventsCollection = db.collection<Task>('events');

    this.events = this.eventsCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));

  }

  getEvents() {
    return this.events;
   }
   getEvent(id: string) {
    return this.eventsCollection.doc(id).valueChanges();
   }
   updateevent(event: Task, id: string) {
    return this.eventsCollection.doc(id).update(event);
   }
   addEvent(event: Task) {
    return this.eventsCollection.add(event);
   }
   removeEvent(id: string) {
    return this.eventsCollection.doc(id).delete();
   }

}
