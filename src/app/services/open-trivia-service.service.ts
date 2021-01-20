import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaServiceService {

  questions: any[] = [ 
    { 
      category: "Entertainment: Japanese Anime & Manga", 
      type: "multiple", 
      difficulty: "easy", 
      question: "In &quot;Fairy Tail&quot;, what is the nickname of Natsu Dragneel?", 
      correct_answer: "The Salamander", 
      incorrect_answers: ["The Dragon Slayer", "The Dragon", "The Demon"] 
    }, 
    { 
      category: "Entertainment: Video Games", 
      type: "boolean", 
      difficulty: "medium", 
      question: "&quot;Return to Castle Wolfenstein&quot; was the only game of the Wolfenstein series where you don&#039;t play as William &quot;B.J.&quot; Blazkowicz.", 
      correct_answer: "False", 
      incorrect_answers: ["True"] 
    }
  ];

  constructor() { }

  async getQuestions(difficulte: string, nb: number): Promise<any[]>{
    return new Promise((resolve, reject) => {
      // Gestions des réponses
      this.questions.forEach((q) => {
        // Créer le tableau des réponses
        q.reponses = [];

        for (const response of q.incorrect_answers){
          q.reponses.push({
            correct: false,
            answer: response
          });
        }


        q.reponses.push({
          correct: true,
          answer: q.correct_answer
        });
       
        q.reponses = this.shuffleArray(q.reponses);

      });

      resolve(this.shuffleArray(this.questions));
    });
  }

//algo pour trier le tableau de manière aléatoire
  private shuffleArray(array: any[]): any[]{

    for (let i = array.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }
  
}
