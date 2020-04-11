import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Animal {
  id: string;
  name: string;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class ZooService {
  baseAPIUrl = 'http://localhost:8081';

  constructor(public http: HttpClient) {}

  getAnimals(): Observable<{ animals: Animal[] }> {
    return this.http.get(this.baseAPIUrl + '/animals') as Observable<{
      animals: Animal[];
    }>;
  }
  postAnimal(animal: Animal): Observable<{ animals: Animal[] }> {
    return this.http.post(this.baseAPIUrl + '/animals', {
      animal
    }) as Observable<{
      animals: Animal[];
    }>;
  }
  patchAnimal(animal: Animal): Observable<{ animals: Animal[] }> {
    return this.http.patch(this.baseAPIUrl + '/animals/' + animal.id, {
      animal
    }) as Observable<{
      animals: Animal[];
    }>;
  }
  deleteAnimal(animal: Animal): Observable<{ animals: Animal[] }> {
    return this.http.delete(
      this.baseAPIUrl + '/animals/' + animal.id
    ) as Observable<{
      animals: Animal[];
    }>;
  }
}
