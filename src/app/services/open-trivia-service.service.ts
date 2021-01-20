import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaServiceService {

  constructor() { }

  getQuestion()
  {
    console.log("clic c'est le service");
    
  }
}
