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
  error: string = '';
  listeDifficulte: Array<string> = ['easy', 'medium', 'hard'];
  difficulte: string = '';
  sauvegarder: Boolean = false;
  connecte: Boolean = false;
  cacher: Boolean = true;

  constructor(public toastController: ToastController) {}

  commencer() : void
  {
    this.error ='';

    if(this.pseudo.trim() === '')
    {
      this.error +=  'Veuillez saisir un pseudo.';
    } else if(this.pseudo.trim().length < 3)
    {
      this.error += 'Veuillez entrer un pseudo de plus de 3 caractères.';
    }
    
    if( this.difficulte.trim() === '')
    {
      this.error +=  'Veuillez choisir un niveau de difficulté.';
    }
    
    if(this.error.trim().length > 0)
    {
      this.presentToast(this.error);
    } else {
      this.connecte = true;
      this.presentToast(`Bienvenue sur OpenTrivia ${this.pseudo}`);
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
  
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      header: msg,
      duration: 3000,
      position: 'top',
      animated: true,
      color: 'warning'
    });
    toast.present();
  }

}
