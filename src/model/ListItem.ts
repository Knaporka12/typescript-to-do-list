interface Item {
    id: string;
    desc: string;
    checked: boolean;
}

export default class ListItem implements Item {

    constructor(
        private _id: string,
        private _desc: string, 
        private _checked: boolean = false
    ) {}

    public set id(id: string){
        this._id = id;
    }

    public set desc(desc: string){
        this._desc = desc;
    }

    public set checked(checked: boolean){
        this._checked = checked;
    }

    public get id() : string {
        return this._id;
    }

    public get desc() : string {
        return this._desc;
    }

    public get checked() : boolean {
        return this._checked;
    }
}
