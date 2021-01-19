import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //déclaration des variables
  pseudo: string = '';
  message: string = '';
  listeDifficulte: Array<string> = ['easy', 'medium', 'hard'];
  difficulte: string = null;
  connecte: Boolean = false;
  cacher: Boolean = true;

  constructor(public toastController: ToastController) {}

  verifSaisie() : void
  {
    if(this.pseudo.length > 3 && this.difficulte != null)
    {
      this.connecte = true;
      this.message = `Bienvenue sur OpenTrivia ${this.pseudo}`;
      this.presentToast();
    }else{
      this.message = "Vous n'avez pas saisie de bonnes informations";
      this.presentToast();
    }
  }

  cacheBouton() : void
  {
    this.cacher = !this.cacher;  
  }
  
  deconnexion() : Boolean
  {
    return this.connecte;
  }
  
  async presentToast() {
    const toast = await this.toastController.create({
      header: this.message,
      duration: 2000,
      position: 'bottom',
      animated: true,
      color: 'warning'
    });
    toast.present();
  }

}
