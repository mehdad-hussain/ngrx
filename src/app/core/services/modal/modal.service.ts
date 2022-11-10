import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
  component: any;
}

@Injectable({
  providedIn: 'root',
})

/** idea:
 * There are 3 ways to make a class injectable: 1. with @Injectable() decorator --- @Injectable({ providedIn: 'root' })
 * 2. through a importing via module - providers , specifically for only that module which need this service.
 *    We have to remove provided in option from  @Injectable() decorator.
 * 3. through a importing via component - providers , specifically for that component which need this service.
 */
export class ModalService {
  // private visible = false;
  private modals: IModal[] = [];

  // idea: we are making this property private so we don't have to think about from where this variable is accessed or modified
  // idea: as we can only access this variable in this class but we have to declare methods that can access this variable from outside this class

  constructor() {}

  register(id: string, component: any) {
    this.modals.push({
      id,
      visible: false,
      component,
    });
    // console.log(this.modals);
  }

  unregister(id: string) {
    this.modals = this.modals.filter((modal) => modal.id !== id);
  }

  isModalOpen(id: string): boolean {
    // return Boolean(this.modals.find(modal => modal.id === id)?.visible);
    return !!this.modals.find((modal) => modal.id === id)?.visible;
    // idea: double negation operator (!!) is used to convert any value to boolean
  }

  toggleModal(id: string) {
    const modal = this.modals.find((modal) => modal.id === id);

    if (modal) {
      modal.visible = !modal.visible;
    }
  }
}
