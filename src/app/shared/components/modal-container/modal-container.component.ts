// prettier-ignore
import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef, OnDestroy } from '@angular/core';
import { ModalService } from '@core';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalContainerComponent implements OnInit, OnDestroy {
  @Input() modalID = '';

  constructor(public modal: ModalService, public el: ElementRef) {
    // idea: if the modal properties/accessor set to private then we can't access it in the template even if it declared inside the class
    // console.log(!this.modal.isModalOpen());
    // console.log(el);
  }

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
  }

  closeModal() {
    this.modal.toggleModal(this.modalID);
  }

  ngOnDestroy(): void {
    this.el.nativeElement.remove();
  }
}
