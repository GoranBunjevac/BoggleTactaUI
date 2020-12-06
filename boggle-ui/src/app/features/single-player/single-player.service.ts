import { Observable } from 'rxjs';
import { Dice } from './models/dice';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class SinglePlayerService {
  constructor(private _httpClient: HttpClient) {}

  getBoard = (): Observable<Dice[]> => this._httpClient.get<Dice[]>('/Board');

  getScore = (words: Array<string>): Observable<number> => {
    const params = this.getScoreParams(words);
    return this._httpClient.get<number>('/Score', { params: params });
  };

  private getScoreParams = (words: Array<string>): HttpParams => {
    let params = new HttpParams();
    if (words) {
      words.forEach((word, index) => {
        params = params.set(`words[${index}]`, word);
      });
    }
    return params;
  };
}
