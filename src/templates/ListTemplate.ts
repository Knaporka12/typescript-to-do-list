import FullList from "../model/FullList";
import { addBtnListeners } from "../main";

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(list: FullList) : void,
}

export default class ListTemplate implements DOMList {

    ul: HTMLUListElement;

    static instance: ListTemplate = new ListTemplate();

    private constructor(){
        this.ul = document.querySelector(`.js-ul`) as HTMLUListElement
    }

    public clear() : void {
        this.ul.innerHTML = '';
    }

    public render(list: FullList) : void {

        let html: string = '';

        list.list.forEach((item) => {

            const checked: string = item.checked ? '<i class="fa-solid fa-check fa-2x"></i>' : '';

            html += `
                <li class="main__li">
                    <p class="main__para-todo-desc">${item.desc}</p>
                    <div>
                        <button class="main__btn-checked js-btn-checked" data-id="${item.id}">${checked}</button>
                        <button class="main__btn-delete js-btn-delete" data-id="${item.id}"><i class="fa-solid fa-trash-can fa-2x"></i></button>
                    </div>
                </li>
            `
        })

       this.ul.innerHTML = html;
       addBtnListeners();

    }
}