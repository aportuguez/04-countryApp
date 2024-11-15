import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>()
  private debouncerSubscription?: Subscription;

  @Input()
  public placeholder: string = ''

  @Input()
  public initialValue: string = ''

  // estaba este antes del debounce
  // @Output()
  // public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {
        this.onDebounce.emit(value)
      })
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe()
  }

  // emitValue(value: string): void {
  //   if (value === '') return;
  //   this.onValue.emit(value)
  // }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }

}
