import { Observable } from 'rxjs';
import { Dice } from './models/dice';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SinglePlayerService {
  constructor(private _httpClient: HttpClient) {}

  getBoard = (): Observable<Dice[]> => this._httpClient.get<Dice[]>('/Board');
}
