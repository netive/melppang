import { Injectable }    from '@angular/core';
//import { Headers, Http, Response, RequestOptions, Jsonp, URLSearchParams } from '@angular/http';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { News }           from '../../models/news';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class NewsListService {

  //private headers = new Headers({'Content-Type': 'application/json'});
  //private headers = new Headers();
  private newsUrl = 'http://www.netive.co.kr/api/contents.php/news';

  //constructor(private http: Http, private jsonp: Jsonp) {
  constructor(private http: Http) {
    //this.headers.append('Accept', 'application/json');
    //this.headers.append('Content-Type', 'application/json');
    //this.headers.append('Access-Control-Allow-Origin', '*');
    //this.headers.append('Authorization', 'Bearer ' + this._tokenService.accessToken);
  }

  /*search (term: string): Promise<string[]>{
      console.log("search start");
    let wikiUrl = 'http://en.wikipedia.org/w/api.php';
    let params = new URLSearchParams();
    params.set('search', term); // the user's search value
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
    // TODO: Add error handling

    let options = new RequestOptions({ headers: this.headers});

    /* return this.jsonp
               .get(this.newsUrl, { search: params })
               //.get(this.newsUrl, options)
               //.map(response => <string[]> response.json().success[1]);
               .map(response => response.json().user)
               //.map(this.extractData)
               .subscribe(data => console.log(data), error => console.log(error));
               //.catch(this.handleError); */

  /*return this.jsonp
             .get(wikiUrl, { search: params })
             .toPromise()
             .then(response => response.json()[1])
             .catch(this.handleError);
}*/

  getNewsListP(): Promise<News[]> {
    //console.log("getNewsList start : " + this.newsUrl);
    //let options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.newsUrl)
      .toPromise()
      .then(response => response.json() as News[])
      .catch(this.handleError);
  }


  getNewsList(): Observable<News[]> {
    //console.log("getNewsList start : " + this.newsUrl);
    //let options = new RequestOptions({ headers: this.headers });
    //return this.http.get("http://www.netive.co.kr/app/news.json")
    return this.http.get(this.newsUrl)
      .map(response => response.json().data as News[])
      //.map(this.extractData)
      .catch(this.handleError);
  }

  /*getNews(id: number): Promise<News> {
    return this.getNewsList()
               .then(newsList => newsList.find(news => news.id === id));
  }*/

  /*private extractData(res: Response) {
    let body = res.json();
    console.log("body : " + JSON.stringify(body));
    return body || { };
  }*/

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  /*handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }*/
}
