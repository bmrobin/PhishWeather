import * as $ from "jquery";

export class Show {

    // only using explicitly defined properties
    // NOTE - the extra fields will be a part of this object when created
    public link: string;
    public location: string;
    public showdate: string;
    public showid: number;
    public setlistnotes: string;
    public venue: string;
    public venueid: number;

    constructor(showData: any) {
        $.extend(this, showData);
    }
}
