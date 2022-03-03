import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CurrentAccount } from '../models/CurrentAccount';
import { History } from '../models/History';
import { HistoryService } from '../service/history.service';
import { UserService } from '../service/user.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  history: History[] = [];
  page = 1;
  pageSize = 5;

  constructor(
    private historyService: HistoryService,
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getHistory();
  }

  public getHistory() {
    this.userService.getCurrentAccount().subscribe((data: CurrentAccount) => {
      this.historyService.getByCc(data.id).subscribe((data) => {
        console.log(data);
        this.history = data;
      });
    });
  }
}
