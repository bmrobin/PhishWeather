import * as $ from "jquery";

export class Show {

    // only using explicitly defined properties
    // NOTE - the extra fields will be a part of this object when created
    public link;
    public location;
    public showdate;
    public showid;
    public setlistnotes;
    public venue;
    public venueid;

    constructor(showData) {
        $.extend(this, showData);
    }
}
