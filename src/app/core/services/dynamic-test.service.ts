import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {DynamicTest} from '../../shared/models/dynamic-test';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class DynamicTestService {

  private testsUrl = 'http://localhost:3000/api/test';

  constructor(private http: HttpClient) {
  }

  getTests(): Observable<DynamicTest[]> {
    return this.http.get<DynamicTest[]>(this.testsUrl, httpOptions)
      .pipe(
        catchError(this.handleError<DynamicTest[]>('getTests'))
      );
  }

  addTest(test: DynamicTest): Observable<DynamicTest> {
    return this.http.post<DynamicTest>(this.testsUrl, test, httpOptions)
      .pipe(
        catchError(this.handleError<DynamicTest>('addTest'))
      );
  }

  deleteTest(id: number): Observable<{}> {
    const url = `${this.testsUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError<{}>('deleteTest'))
      );
  }

  private handleError<T>(operation = 'operation') {
    // https://scotch.io/bar-talk/error-handling-with-angular-6-tips-and-best-practices192
    return (error: any): Observable<T> => {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error (${operation}): ${error.error.message}`;
      } else {
        // server-side error
        errorMessage = `Error Code (${operation}): ${error.status}\nMessage: ${error.message}`;
      }
      // TODO: send the error to remote logging infrastructure
      console.error(errorMessage); // log to console instead

      return throwError(errorMessage);
    };
  }
}
