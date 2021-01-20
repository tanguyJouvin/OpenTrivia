import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { OpenTriviaServiceService } from '../services/open-trivia-service.service';

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
  beginGame: Boolean = false;
  nextQuestion: Boolean = false;
  endGame: boolean;
 

  //constructeur de la classe Home Page
  constructor(public toastController: ToastController,
              private OpenTriviaServiceService: OpenTriviaServiceService) {}

  //méthode pour afficher un toast pour informer l'utilisateur
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

  //fonction enclenchée lors du clic sur le bouton et fait basculer sur le questionnaire
  //sinon renvoie une erreur à l'utilisateur
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
      this.presentToast(`Bienvenue sur OpenTrivia ${this.pseudo}`);
      this.loadQuestion();
    }
    
  }

  /**
   *  TODO : partie questionnaire a déplacer dans un autre composant
   */
  questions : any[] = [];
  questionCourante: any;
  numeroQuestion: number = 0;
  score: number = 0;
 
  async loadQuestion() {
    
    this.numeroQuestion = 0;
    this.score = 0;
   try
   {
      this.questions = await this.OpenTriviaServiceService.getQuestions(this.difficulte, 10);
      console.log(this.questions);
      
      this.choixQuestion();
      this.beginGame = true;
   } catch (error)
   {
      console.log(error);
   }
  }

  private choixQuestion()
  {
    this.questionCourante = this.questions[this.numeroQuestion];
  }

  reponse(reponse: any) : void
  {
    // empêche clic sur plusieurs réponses
    if (!this.nextQuestion) {
      // gestion du score
      if (reponse.correct) {
        this.score++;
      }

      this.nextQuestion = true;

      if (this.numeroQuestion >= this.questions.length - 1) {
        this.endGame = true;
      }
    }
  }

  questionSuivante(): void {
    this.numeroQuestion++;
    this.nextQuestion = false;
    this.choixQuestion();
  }

  retour(): void {
    this.presentToast('Votre score est de ' + this.score + ' point' +
        (this.score > 1 ? 's' : ''));
    this.beginGame = false;
  }
}
