import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class EditTodoResolver implements Resolve<any>{

  constructor(public fbService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return new Promise((resolve, reject) => {
      const id = route.paramMap.get('id');
      this.fbService.getTodo(id)
        .subscribe(data => resolve(data));
    });
  }
}
