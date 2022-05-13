import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private apollo: Apollo) {}

  getDecodeToken() {
    const token = localStorage.getItem(environment.tokenKey)!;
    return JSON.parse(atob(token.split('.')[1]));
  }

  loginUser(email: string, password: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
        mutation  {
          login(input : {email: "${email}", password: "${password}"}) {            
            token
          }
        }
      `,
      })
      .pipe(
        map((resp) => {
          this.userLogin(resp.data);
          return resp;
        })
      );
  }

  userLogin(data: any) {
    localStorage.setItem(
      environment.tokenKey,
      JSON.stringify(data.login.token)
    );
  }

  logOut() {
    localStorage.removeItem(environment.tokenKey);
  }
}
