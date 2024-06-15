import './css/style.css'
import ListItem from './model/ListItem'
import FullList from './model/FullList'
import ListTemplate from './templates/ListTemplate'

const fullList = FullList.instance
const template = ListTemplate.instance

const initApp = (): void => {

  fullList.load();
  template.render(fullList);

  addFormListener();
  addClearListener()

}

const addDeleteListeners = () :void => {

  const deleteBtns = document.querySelectorAll(`.js-btn-delete`) as NodeListOf<HTMLButtonElement>;
  deleteBtns.forEach((btn) => {

    btn.addEventListener('click', () => {
      const itemId = btn.dataset.id!; // wykrzyknik czyli assertion
      fullList.removeItem(itemId);
      template.render(fullList);
    })

  })

}

const addFormListener = () :void => {

  const formEle = document.querySelector(`.js-form`) as HTMLFormElement;
  formEle.addEventListener('submit', (e: SubmitEvent) => {

    e.preventDefault();

    const descInputEle = document.querySelector(`.js-add-input`) as HTMLInputElement;
    const itemDesc = descInputEle.value.trim();
    if (!itemDesc) return;

    const itemId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 0;

    const newItem = new ListItem(itemId.toString(), itemDesc)
    fullList.addItem(newItem);
    template.render(fullList);
    formEle.reset();

  })

}

const addCheckListeners = () :void =>  {

  const checkBtns = document.querySelectorAll(`.js-btn-checked`) as NodeListOf<HTMLButtonElement>;
  checkBtns.forEach((btn) => {

    btn.addEventListener('click', () => {
      const itemId = btn.dataset.id!;
      fullList.changeCheckStatus(itemId);
      template.render(fullList);
    })

  })

}

const addClearListener = () :void =>  {

  const clearBtn = document.querySelector(`.js-btn-clear`) as HTMLButtonElement;
  clearBtn.addEventListener('click', () => {
    fullList.clearList();
    template.render(fullList);
  })

}

export const addBtnListeners = (): void => {
  addDeleteListeners();
  addCheckListeners();
}

document.addEventListener("DOMContentLoaded", initApp) 