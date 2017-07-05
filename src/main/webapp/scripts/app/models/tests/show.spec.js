import { Show } from "../show";

describe("Models: Show", () => {

  test("should create show object from json", () => {
    let jsonData = {
      link: "link",
      location: "Virginia Beach, VA, USA",
      setlistnotes: "",
      showdate: "1998-08-09",
      showid: 1252724010,
      venue: "Virginia Beach Amphitheater",
      venueid: 407
    };
    let show = new Show(jsonData);
    expect(show).not.toBe(null);
    expect(show.link).toBe("link");
    expect(show.location).toBe("Virginia Beach, VA, USA");
    expect(show.setlistnotes).toBe("");
    expect(show.showdate).toBe("1998-08-09");
    expect(show.showid).toBe(1252724010);
    expect(show.venue).toBe("Virginia Beach Amphitheater");
    expect(show.venueid).toBe(407);
  });

});
