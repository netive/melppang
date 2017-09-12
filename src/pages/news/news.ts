import { Component, OnInit } from '@angular/core';
import { ModalController }     from 'ionic-angular';
import { NewsListService }   from '../../providers/news/news';

import { News }             from '../../models/news';

@Component({
  selector: 'news-list',
  providers: [ NewsListService ],
  templateUrl: 'news.html',
})

export class NewsPage implements OnInit {
  errorMessage: string;
  mode = 'Observable';
  newsList: News[];

  constructor(public modalCtrl: ModalController,
              private newsListService: NewsListService) {
  }

  getNewsList() {
    this.newsListService.getNewsList()
      .subscribe(
        newsList => this.newsList = newsList,
        error => this.errorMessage = <any>error);
  }

  ngOnInit(): void {
    this.getNewsList();
  }

}
