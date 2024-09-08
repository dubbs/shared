import { expect, test } from "@jest/globals";
import { getEvents } from "./events";

test("should have api available (NetworkTest)", async () => {
  const events = await getEvents();
  expect(events[0].title).not.toBe("");
  expect(events[0].url).not.toBe("");
  expect(events[0].img).not.toBe("");
});

test("should extract articles from html (MockTest)", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    text: () =>
      Promise.resolve(`
<body>
<article class="event card">
<div class="wrapper">
<div class="media">
<figure>
<img src="/sites/default/files/styles/card/public/2024-03/luek.jpg?h=a955cd85&amp;itok=KbB_VXKK" width="650" height="500" alt="Luke" loading="lazy" />
</figure>
<div class="overlay-date">
<div>
<span class="day">24</span>
<span class="month">Apr</span>
</div>
</div>
</div>
<div class="content">
<h6>Luke Bryan- Mind of a Country Boy Tour</h6>
<div class="info">
<div class="location">SaskTel Centre</div>
<div class="date">
Apr 24, 2024
</div>
<div class="time">7:00 PM</div>
</div>
<div class="links">
<a href="/calendar-events/luke-bryan-mind-of-a-country-boy-tour" aria-label="View Event information for Luke Bryan- Mind of a Country Boy Tour">View Event</a>
</div>
</div>
</div>
</article></body>
        `),
  });
  const events = await getEvents();
  expect(events).toHaveLength(1);
  expect(events[0].title).toBe("Luke Bryan- Mind of a Country Boy Tour");
  expect(events[0].location).toBe("SaskTel Centre");
  expect(events[0].date).toBe("Apr 24, 2024");
  expect(events[0].time).toBe("7:00 PM");
  expect(events[0].url).toBe(
    "https://www.discoversaskatoon.com/calendar-events/luke-bryan-mind-of-a-country-boy-tour",
  );
  expect(events[0].img).toBe(
    "https://www.discoversaskatoon.com/sites/default/files/styles/card/public/2024-03/luek.jpg?h=a955cd85&itok=KbB_VXKK",
  );
});
