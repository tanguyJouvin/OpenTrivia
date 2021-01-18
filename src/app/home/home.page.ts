import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //déclaration des variables
  pseudo: String = '';
  message: String = '';
  listeDifficulte: Array<string> = ['easy', 'medium', 'hard'];
  difficulte: String = null;
  connecte: Boolean = false;
  clique: Boolean = false;

  constructor() {}

  verifSaisie() : String
  {

    if(this.pseudo.length > 3 || this.difficulte != null)
    {
      this.connecte = true;
      this.message = `Bienvenue sur OpenTrivia ${this.pseudo}`;
    }else{
      this.connecte;
      this.message = "Vous n'avez pas saisie de bonnes informations";
    }
    return this.message;
  }

  controlSaisie() 
  {
    return !this.clique;
    
  }
  deconnexion() : Boolean
  {
    return this.connecte;
  }
  

}
