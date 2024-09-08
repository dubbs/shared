import { expect, test } from "@jest/globals";
import { getIIHF } from "./iihf";

test("should have api available (NetworkTest)", async () => {
  const games = await getIIHF();
  expect(games).not.toHaveLength(0);
  expect(games[0].homeScore).toBe(5);
  expect(games[0].homeTeam.name).toBe("SUI");
  expect(games[0].awayScore).toBe(2);
  expect(games[0].awayTeam.name).toBe("NOR");
});

test(" should map response (MockTest)", async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    ok: true,
    text: () =>
      Promise.resolve(`
      

<div data-gameislive="False" data-gameisupcoming="False" data-gameisfinal="True" data-gameisforfeit="False" data-gameisfinalshootout="False" data-gameisfinalovertime="False" data-timeoffset="2" data-venue="PRA" data-group="A" data-phase="PreliminaryRound" data-team="true" data-hometeam="SUI" data-guestteam="NOR" data-date="2024-05-10" data-date-utc="2024-05-10" data-time-utc="14:20:00" data-game-id="11226" data-venue-time-label="Local time" data-your-time-label="Your time" data-localized-day="day" class="b-card-schedule s-card-container visible  " data-started="true"><div data-time="May 10, 2024 16:20:00 GMT+2" data-day="10" class="s-date">10 May</div> <div class="s-table"><div class="s-team s-team--winner  s-country--winner"><div class="s-country  s-country--winner  s-country--winner">
SUI
</div> <span class="s-country--a3">SUI</span> <div class="s-flag " style="background-image: url(&quot;https://blob.iihf.com/iihf-media/iihfmvc/media/contentimages/1_global/mna/flagsrect/sui.svg?width=50&quot;);"></div> <div class="s-count js-homescore"><span>
5
</span></div></div> <div class="s-text"><span>FINAL</span></div> <div class="s-team "><div class="s-count  js-awayscore"><span>
2
</span></div> <div class="s-flag " style="background-image: url(&quot;https://blob.iihf.com/iihf-media/iihfmvc/media/contentimages/1_global/mna/flagsrect/nor.svg?width=50&quot;);"></div> <div class="s-country  ">
NOR
</div> <span class="s-country--a3">NOR</span></div></div> <div class="s-countries"><span class="s-countries__item s-countries__item--winner ">SUI</span> vs
<span class="s-countries__item  ">NOR</span></div> <div class="s-arena">Prague Arena, Group A</div> <div data-is-localized="true" class="s-time">16:20 (Local time)<br>08:20 (Your time)</div> <div class="s-hover"><a href="/en/events/2024/wm/gamecenter/playbyplay/54187/1-sui-vs-nor" target="_blank" class="s-hover__link"><img src="/images/icon-mc.png" alt="" class="s-img"> <div class="s-title">Game Centre</div></a></div></div>

<div data-gameislive="False" data-gameisupcoming="True" data-gameisfinal="False" data-gameisforfeit="False" data-gameisfinalshootout="False" data-gameisfinalovertime="False" data-timeoffset="2" data-venue="OST" data-group="B" data-phase="PreliminaryRound" data-team="true" data-hometeam="SWE" data-guestteam="FRA" data-date="2024-05-20" data-date-utc="2024-05-20" data-time-utc="14:20:00" data-game-id="11273" data-venue-time-label="Local time" data-your-time-label="Your time" data-localized-day="day" class="b-card-schedule s-card-container visible  " data-started="true" style="margin-right: 0px;"><div data-time="May 20, 2024 16:20:00 GMT+2" data-day="20" class="s-date">20 May</div> <div class="s-table"><div class="s-team  "><div class="s-country   ">
SWE
</div> <span class="s-country--a3">SWE</span> <div class="s-flag " style="background-image: url(&quot;https://blob.iihf.com/iihf-media/iihfmvc/media/contentimages/1_global/mna/flagsrect/swe.svg?width=50&quot;);"></div> <!----></div> <div class="s-upcoming">UPCOMING</div> <div class="s-team "><!----> <div class="s-flag " style="background-image: url(&quot;https://blob.iihf.com/iihf-media/iihfmvc/media/contentimages/1_global/mna/flagsrect/fra.svg?width=50&quot;);"></div> <div class="s-country  ">
FRA
</div> <span class="s-country--a3">FRA</span></div></div> <div class="s-countries"><span class="s-countries__item  ">SWE</span> vs
<span class="s-countries__item  ">FRA</span></div> <div class="s-arena">Ostrava Arena, Group B</div> <div data-is-localized="true" class="s-time">16:20 (Local time)<br>08:20 (Your time)</div> <div class="s-hover"><a href="https://www.iihf.com/en/events/2024/wm/static/54833/information" target="_blank" class="s-hover__link"><img src="/images/icon-ticket.png" alt="" class="s-img"> <div class="s-title">buy tickets</div></a> <a href="/en/events/2024/wm/gamecenter/playbyplay/54234/48-swe-vs-fra" target="_blank" class="s-hover__link"><img src="/images/icon-mc.png" alt="" class="s-img"> <div class="s-title">Game Centre</div></a></div></div>

<div data-gameislive="False" data-gameisupcoming="True" data-gameisfinal="False" data-gameisforfeit="False" data-gameisfinalshootout="False" data-gameisfinalovertime="False" data-timeoffset="2" data-venue="OST" data-group="" data-phase="Quarterfinals" data-team="true" data-hometeam="QF" data-guestteam="QF" data-date="2024-05-23" data-date-utc="2024-05-23" data-time-utc="14:20:00" data-game-id="11283" data-venue-time-label="Local time" data-your-time-label="Your time" data-localized-day="day" class="b-card-schedule s-card-container visible  " data-started="true" style="margin-right: 0px;"><div data-time="May 23, 2024 16:20:00 GMT+2" data-day="23" class="s-date">23 May</div> <div class="s-table"><div class="s-team  "><div class="s-country   ">
QF
</div> <span class="s-country--a3">QF</span> <div class="s-flag "></div> <!----></div> <div class="s-upcoming">UPCOMING</div> <div class="s-team "><!----> <div class="s-flag "></div> <div class="s-country  ">
QF
</div> <span class="s-country--a3">QF</span></div></div> <div class="s-countries"><span class="s-countries__item  ">QF</span> vs
<span class="s-countries__item  ">QF</span></div> <div class="s-arena">Ostrava Arena</div> <div data-is-localized="true" class="s-time">16:20 (Local time)<br>08:20 (Your time)</div> <div class="s-hover"><a href="https://www.iihf.com/en/events/2024/wm/static/54833/information" target="_blank" class="s-hover__link"><img src="/images/icon-ticket.png" alt="" class="s-img"> <div class="s-title">buy tickets</div></a> <a href="/en/events/2024/wm/gamecenter/playbyplay/54244/58-qf-vs-qf" target="_blank" class="s-hover__link"><img src="/images/icon-mc.png" alt="" class="s-img"> <div class="s-title">Game Centre</div></a></div></div>


            `),
  });

  const games = await getIIHF();
  expect(games).toHaveLength(3);
});
