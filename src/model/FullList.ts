import ListItem from "./ListItem";

interface List {
    list: ListItem[];
    load(): void;
    save(): void;
    clearList(): void;
    addItem(item: ListItem): void;
    removeItem(id: string): void;
    changeCheckStatus(id: string): void;
}

export default class FullList implements List {

    static instance: FullList = new FullList();

    private constructor(private _list: ListItem[] = []){}

    public get list() :ListItem[] {
        return this._list;
    }

    public load() :void {

        const storedList: string | null = localStorage.getItem('list');
        if (typeof storedList !== 'string') return;

        console.log(JSON.parse(storedList))

        const parsedList: { _id: string, _desc: string, _checked: boolean }[] = JSON.parse(storedList);

        parsedList.forEach((item) => {
            const newListItem = new ListItem(item._id, item._desc, item._checked)
            FullList.instance.addItem(newListItem);
        })
    }

    public save() :void {
        localStorage.setItem('list', JSON.stringify(this._list));
    }

    public clearList() :void {
        this._list = [];
        this.save();
    }

    public addItem(item: ListItem) :void {
        const updatedArray = [...this._list, item];
        this._list = updatedArray;
        this.save();
    }

    public removeItem(id: string) :void {
        const updatedArray = this._list.filter((item) => item.id !== id);
        this._list = updatedArray;
        this.save();
    }

    public changeCheckStatus(id: string) :void {
        const updatedArray = this._list.map((item) => {
            if (item.id === id) item.checked = !item.checked
            return item;
        });

        this._list = updatedArray;
        this.save();
        
    }
}

