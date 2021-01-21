import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  questions : any = {};
  api: string = 'https://opentdb.com/api.php?amount=10&category=18';

  constructor(private http: HttpClient) { }

  getQuestions()
  {
    this.http.get(this.api).toPromise()
    .then(res=> {
     this.questions = res;
      this.questions.results.forEach(q => {
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
        this.shuffleArray(this.questions);
    })
    .catch(err=>console.log(err));
  }) 
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


