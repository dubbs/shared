import { expect, test } from "@jest/globals";
import { sportsChl } from "./chl";
import { dateFormatIsoShort, dateTomorrow, dateYesterday } from "./date";

test("should have api available (NetworkTest)", async () => {
  const blades = await sportsChl("https://chl.ca/whl/schedule/all/284/");
  expect(blades).not.toHaveLength(0);
});

test("should call gameCentre when for current game only", async () => {
  const yesterday = dateFormatIsoShort(dateYesterday());
  const today = dateFormatIsoShort(new Date());
  const tomorrow = dateFormatIsoShort(dateTomorrow());
  const json = [
    [
      "",
      [yesterday, "???"],
      ["https://assets.leaguestat.com/whl/logos/209.png", "AWAY"],
      "0",
      ["https://assets.leaguestat.com/whl/logos/213.png", "HOME"],
      "0",
      [
        "0",
        "Final",
        "https://chl.ca/whl/gamecentre/YESTERDAY",
        "Final",
        "Final",
        "h:mm a z",
      ],
      "0",
      ["", ""],
      "LOCATION - SK",
    ],
    [
      "",
      [today, "???"],
      ["https://assets.leaguestat.com/whl/logos/209.png", "AWAY"],
      "0",
      ["https://assets.leaguestat.com/whl/logos/213.png", "HOME"],
      "0",
      [
        "0",
        "10:00 1st",
        "https://chl.ca/whl/gamecentre/TODAY",
        "10:00 1st",
        "10:00 1st",
        "h:mm a z",
      ],
      "0",
      ["", ""],
      "LOCATION - SK",
    ],
    [
      "",
      [tomorrow, "???"],
      ["https://assets.leaguestat.com/whl/logos/209.png", "AWAY"],
      "0",
      ["https://assets.leaguestat.com/whl/logos/213.png", "HOME"],
      "0",
      [
        "0",
        "7:00 pm ST",
        "https://chl.ca/whl/gamecentre/TOMORROW",
        "7:00 pm ST",
        "7:00 pm ST",
        "h:mm a z",
      ],
      "0",
      ["", ""],
      "LOCATION - SK",
    ],
  ];
  const mockFetch = jest
    .fn()
    .mockResolvedValueOnce({
      ok: true,
      text: () =>
        Promise.resolve(`<script>data: ${JSON.stringify(json)} });\t</script>`),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: () => {
        return {
          GC: {
            Clock: {},
          },
        };
      },
    });

  global.fetch = mockFetch;
  const blades = await sportsChl("https://chl.ca/whl/schedule/all/284/");
  expect(mockFetch).toHaveBeenCalledTimes(2);
  expect(mockFetch).toHaveBeenLastCalledWith(
    "https://lscluster.hockeytech.com/feed/?feed=gc&key=f1aa699db3d81487&game_id=TODAY&client_code=whl&tab=clock&lang_code=en&fmt=json",
  );
});
// test("should not call gameCentre for finished events");
// test("should not call gameCentre for future events");

test("should map response (MockTest)", async () => {
  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      ok: true,
      text: () =>
        Promise.resolve(`
          <script>
data: [["",["2024-03-28","Thu, Mar 28"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/209.png","Prince Albert"],"4",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/213.png","Saskatoon"],"3",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021038","Final","Final","h:mm a z"],"6757",["",""],"SaskTel Centre - Saskatoon, SK"],["",["2024-03-29","Fri, Mar 29"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/205.png","Lethbridge"],"0",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/216.png","Swift Current"],"3",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021027","Final","Final","h:mm a z"],"2890",["",""],"InnovationPlex - Swift Current, SK"],["",["2024-03-29","Fri, Mar 29"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/201.png","Brandon"],"4",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/207.png","Moose Jaw"],"7",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021029","Final","Final","h:mm a z"],"3722",["",""],"Moose Jaw Events Centre - Moose Jaw, SK"],["",["2024-03-29","Fri, Mar 29"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/211.png","Red Deer"],"5",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/206.png","Medicine Hat"],"4",["4","Final OT2","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021031","Final OT2","Final OT2","h:mm a z"],"4522",["",""],"Co-op Place - Medicine Hat, AB"],["",["2024-03-29","Fri, Mar 29"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/209.png","Prince Albert"],"1",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/213.png","Saskatoon"],"4",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021039","Final","Final","h:mm a z"],"8242",["",""],"SaskTel Centre - Saskatoon, SK"],["",["2024-03-29","Fri, Mar 29"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/215.png","Spokane"],"1",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/210.png","Prince George"],"6",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021021","Final","Final","h:mm a z"],"5692",["",""],"CN Centre - Prince George, BC"],["",["2024-03-29","Fri, Mar 29"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/227.png","Victoria"],"3",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/208_284.png","Portland"],"4",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021023","Final","Final","h:mm a z"],"4972",["",""],"Veterans Memorial Coliseum - Portland, OR"],["",["2024-03-29","Fri, Mar 29"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/204.png","Kelowna"],"6",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/222_284.png","Wenatchee"],"8",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021074","Final","Final","h:mm a z"],"2110",["",""],"Town Toyota Center - Wenatchee, WA"],["",["2024-03-29","Fri, Mar 29"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/223.png","Vancouver"],"6",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/226.png","Everett"],"4",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021025","Final","Final","h:mm a z"],"4322",["",""],"Angel of the Winds Arena - Everett, WA"],["",["2024-03-30","Sat, Mar 30"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/215.png","Spokane"],"4",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/210.png","Prince George"],"7",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021022","Final","Final","h:mm a z"],"5678",["",""],"CN Centre - Prince George, BC"],["",["2024-03-30","Sat, Mar 30"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/227.png","Victoria"],"1",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/208_284.png","Portland"],"5",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021024","Final","Final","h:mm a z"],"5868",["",""],"Veterans Memorial Coliseum - Portland, OR"],["",["2024-03-30","Sat, Mar 30"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/201.png","Brandon"],"4",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/207.png","Moose Jaw"],"5",["4","Final OT","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021030","Final OT","Final OT","h:mm a z"],"3557",["",""],"Moose Jaw Events Centre - Moose Jaw, SK"],["",["2024-03-30","Sat, Mar 30"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/211.png","Red Deer"],"1",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/206.png","Medicine Hat"],"3",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021032","Final","Final","h:mm a z"],"4175",["",""],"Co-op Place - Medicine Hat, AB"],["",["2024-03-30","Sat, Mar 30"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/205.png","Lethbridge"],"3",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/216.png","Swift Current"],"4",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021046","Final","Final","h:mm a z"],"2890",["",""],"InnovationPlex - Swift Current, SK"],["",["2024-03-30","Sat, Mar 30"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/204.png","Kelowna"],"3",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/222_284.png","Wenatchee"],"1",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021075","Final","Final","h:mm a z"],"2166",["",""],"Town Toyota Center - Wenatchee, WA"],["",["2024-03-30","Sat, Mar 30"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/223.png","Vancouver"],"1",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/226.png","Everett"],"2",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021026","Final","Final","h:mm a z"],"4726",["",""],"Angel of the Winds Arena - Everett, WA"],["",["2024-04-02","Tue, Apr 2"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/206.png","Medicine Hat"],"3",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/211.png","Red Deer"],"4",["4","Final OT","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021033","Final OT","Final OT","h:mm a z"],"4040",["",""],"Peavey Mart Centrium - Red Deer, AB"],["",["2024-04-02","Tue, Apr 2"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/213.png","Saskatoon"],"4",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/209.png","Prince Albert"],"3",["4","Final OT","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021040","Final OT","Final OT","h:mm a z"],"2930",["",""],"Art Hauser Centre - Prince Albert, SK"],["",["2024-04-02","Tue, Apr 2"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/216.png","Swift Current"],"5",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/205.png","Lethbridge"],"3",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021047","Final","Final","h:mm a z"],"3551",["",""],"Enmax Centre - Lethbridge, AB"],["",["2024-04-02","Tue, Apr 2"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/210.png","Prince George"],"4",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/215.png","Spokane"],"2",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021059","Final","Final","h:mm a z"],"3606",["",""],"Spokane Veterans Memorial Arena - Spokane, WA"],["",["2024-04-02","Tue, Apr 2"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/208_284.png","Portland"],"6",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/227.png","Victoria"],"5",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021064","Final","Final","h:mm a z"],"3157",["",""],"Save-On-Foods Memorial Arena - Victoria, BC"],["",["2024-04-02","Tue, Apr 2"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/222_284.png","Wenatchee"],"1",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/204.png","Kelowna"],"5",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021076","Final","Final","h:mm a z"],"4002",["",""],"Prospera Place - Kelowna, BC"],["",["2024-04-03","Wed, Apr 3"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/207.png","Moose Jaw"],"6",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/201.png","Brandon"],"4",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021054","Final","Final","h:mm a z"],"2209",["",""],"Westoba Place - Brandon, MB"],["",["2024-04-03","Wed, Apr 3"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/206.png","Medicine Hat"],"2",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/211.png","Red Deer"],"3",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021034","Final","Final","h:mm a z"],"4367",["",""],"Peavey Mart Centrium - Red Deer, AB"],["",["2024-04-03","Wed, Apr 3"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/213.png","Saskatoon"],"4",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/209.png","Prince Albert"],"1",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021041","Final","Final","h:mm a z"],"2926",["",""],"Art Hauser Centre - Prince Albert, SK"],["",["2024-04-03","Wed, Apr 3"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/216.png","Swift Current"],"5",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/205.png","Lethbridge"],"4",["4","Final OT2","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021048","Final OT2","Final OT2","h:mm a z"],"3482",["",""],"Enmax Centre - Lethbridge, AB"],["",["2024-04-03","Wed, Apr 3"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/210.png","Prince George"],"3",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/215.png","Spokane"],"2",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021060","Final","Final","h:mm a z"],"3434",["",""],"Spokane Veterans Memorial Arena - Spokane, WA"],["",["2024-04-03","Wed, Apr 3"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/226.png","Everett"],"3",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/223.png","Vancouver"],"1",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021069","Final","Final","h:mm a z"],"2125",["",""],"Langley Events Centre - Langley, BC"],["",["2024-04-03","Wed, Apr 3"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/208_284.png","Portland"],"4",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/227.png","Victoria"],"1",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021065","Final","Final","h:mm a z"],"3067",["",""],"Save-On-Foods Memorial Arena - Victoria, BC"],["",["2024-04-03","Wed, Apr 3"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/222_284.png","Wenatchee"],"1",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/204.png","Kelowna"],"3",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021077","Final","Final","h:mm a z"],"4007",["",""],"Prospera Place - Kelowna, BC"],["",["2024-04-04","Thu, Apr 4"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/207.png","Moose Jaw"],"6",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/201.png","Brandon"],"2",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021055","Final","Final","h:mm a z"],"1904",["",""],"Westoba Place - Brandon, MB"],["",["2024-04-05","Fri, Apr 5"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/211.png","Red Deer"],"5",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/206.png","Medicine Hat"],"2",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021035","Final","Final","h:mm a z"],"5263",["",""],"Co-op Place - Medicine Hat, AB"],["",["2024-04-05","Fri, Apr 5"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/209.png","Prince Albert"],"2",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/213.png","Saskatoon"],"6",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021042","Final","Final","h:mm a z"],"9869",["",""],"SaskTel Centre - Saskatoon, SK"],["",["2024-04-05","Fri, Apr 5"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/226.png","Everett"],"4",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/223.png","Vancouver"],"1",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021070","Final","Final","h:mm a z"],"3629",["",""],"Langley Events Centre - Langley, BC"],["",["2024-04-05","Fri, Apr 5"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/204.png","Kelowna"],"4",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/222_284.png","Wenatchee"],"5",["4","Final OT","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021078","Final OT","Final OT","h:mm a z"],"2757",["",""],"Town Toyota Center - Wenatchee, WA"],["",["2024-04-07","Sun, Apr 7"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/222_284.png","Wenatchee"],"2",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/204.png","Kelowna"],"4",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021079","Final","Final","h:mm a z"],"3501",["",""],"Prospera Place - Kelowna, BC"],["",["2024-04-07","Sun, Apr 7"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/223.png","Vancouver"],"0",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/226.png","Everett"],"5",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021071","Final","Final","h:mm a z"],"5227",["",""],"Angel of the Winds Arena - Everett, WA"],["",["2024-04-12","Fri, Apr 12"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/211.png","Red Deer"],"1",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/213.png","Saskatoon"],"4",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021085","Final","Final","h:mm a z"],"8355",["",""],"SaskTel Centre - Saskatoon, SK"],["",["2024-04-12","Fri, Apr 12"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/216.png","Swift Current"],"7",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/207.png","Moose Jaw"],"2",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021092","Final","Final","h:mm a z"],"4586",["",""],"Moose Jaw Events Centre - Moose Jaw, SK"],["",["2024-04-12","Fri, Apr 12"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/204.png","Kelowna"],"0",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/210.png","Prince George"],"4",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021081","Final","Final","h:mm a z"],"5867",["",""],"CN Centre - Prince George, BC"],["",["2024-04-12","Fri, Apr 12"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/226.png","Everett"],"2",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/208_284.png","Portland"],"8",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021083","Final","Final","h:mm a z"],"5344",["",""],"Veterans Memorial Coliseum - Portland, OR"],["",["2024-04-13","Sat, Apr 13"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/204.png","Kelowna"],"0",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/210.png","Prince George"],"5",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021082","Final","Final","h:mm a z"],"5858",["",""],"CN Centre - Prince George, BC"],["",["2024-04-13","Sat, Apr 13"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/226.png","Everett"],"1",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/208_284.png","Portland"],"6",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021084","Final","Final","h:mm a z"],"6226",["",""],"Veterans Memorial Coliseum - Portland, OR"],["",["2024-04-13","Sat, Apr 13"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/216.png","Swift Current"],"2",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/207.png","Moose Jaw"],"7",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021094","Final","Final","h:mm a z"],"4570",["",""],"Moose Jaw Events Centre - Moose Jaw, SK"],["",["2024-04-14","Sun, Apr 14"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/211.png","Red Deer"],"1",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/213.png","Saskatoon"],"2",["4","Final OT","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021086","Final OT","Final OT","h:mm a z"],"8051",["",""],"SaskTel Centre - Saskatoon, SK"],["",["2024-04-15","Mon, Apr 15"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/208_284.png","Portland"],"4",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/226.png","Everett"],"3",["4","Final OT","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021106","Final OT","Final OT","h:mm a z"],"3431",["",""],"Angel of the Winds Arena - Everett, WA"],["",["2024-04-16","Tue, Apr 16"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/213.png","Saskatoon"],"8",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/211.png","Red Deer"],"5",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021087","Final","Final","h:mm a z"],"4411",["",""],"Peavey Mart Centrium - Red Deer, AB"],["",["2024-04-16","Tue, Apr 16"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/207.png","Moose Jaw"],"5",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/216.png","Swift Current"],"3",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021095","Final","Final","h:mm a z"],"2890",["",""],"InnovationPlex - Swift Current, SK"],["",["2024-04-16","Tue, Apr 16"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/210.png","Prince George"],"4",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/204.png","Kelowna"],"3",["4","Final OT","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021101","Final OT","Final OT","h:mm a z"],"3787",["",""],"Prospera Place - Kelowna, BC"],["",["2024-04-17","Wed, Apr 17"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/213.png","Saskatoon"],"7",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/211.png","Red Deer"],"0",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021088","Final","Final","h:mm a z"],"4415",["",""],"Peavey Mart Centrium - Red Deer, AB"],["",["2024-04-17","Wed, Apr 17"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/207.png","Moose Jaw"],"5",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/216.png","Swift Current"],"2",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021096","Final","Final","h:mm a z"],"2890",["",""],"InnovationPlex - Swift Current, SK"],["",["2024-04-17","Wed, Apr 17"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/210.png","Prince George"],"1",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/204.png","Kelowna"],"2",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021102","Final","Final","h:mm a z"],"3852",["",""],"Prospera Place - Kelowna, BC"],["",["2024-04-19","Fri, Apr 19"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/216.png","Swift Current"],"2",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/207.png","Moose Jaw"],"4",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021098","Final","Final","h:mm a z"],"4567",["",""],"Moose Jaw Events Centre - Moose Jaw, SK"],["",["2024-04-19","Fri, Apr 19"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/204.png","Kelowna"],"3",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/210.png","Prince George"],"6",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021103","Final","Final","h:mm a z"],"6014",["",""],"CN Centre - Prince George, BC"],["",["2024-04-19","Fri, Apr 19"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/208_284.png","Portland"],"5",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/226.png","Everett"],"0",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021107","Final","Final","h:mm a z"],"5540",["",""],"Angel of the Winds Arena - Everett, WA"],["",["2024-04-26","Fri, Apr 26"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/207.png","Moose Jaw"],"4",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/213.png","Saskatoon"],"3",["4","Final OT","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021111","Final OT","Final OT","h:mm a z"],"8973",["",""],"SaskTel Centre - Saskatoon, SK"],["",["2024-04-26","Fri, Apr 26"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/208_284.png","Portland"],"0",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/210.png","Prince George"],"5",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021118","Final","Final","h:mm a z"],"6011",["",""],"CN Centre - Prince George, BC"],["",["2024-04-27","Sat, Apr 27"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/207.png","Moose Jaw"],"2",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/213.png","Saskatoon"],"3",["4","Final OT","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021112","Final OT","Final OT","h:mm a z"],"9328",["",""],"SaskTel Centre - Saskatoon, SK"],["",["2024-04-27","Sat, Apr 27"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/208_284.png","Portland"],"5",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/210.png","Prince George"],"3",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021119","Final","Final","h:mm a z"],"6016",["",""],"CN Centre - Prince George, BC"],["",["2024-04-29","Mon, Apr 29"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/210.png","Prince George"],"1",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/208_284.png","Portland"],"4",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021120","Final","Final","h:mm a z"],"5608",["",""],"Veterans Memorial Coliseum - Portland, OR"],["",["2024-04-30","Tue, Apr 30"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/213.png","Saskatoon"],"1",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/207.png","Moose Jaw"],"3",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021113","Final","Final","h:mm a z"],"4483",["",""],"Moose Jaw Events Centre - Moose Jaw, SK"],["",["2024-05-01","Wed, May 1"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/213.png","Saskatoon"],"5",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/207.png","Moose Jaw"],"4",["4","Final OT","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021114","Final OT","Final OT","h:mm a z"],"4643",["",""],"Moose Jaw Events Centre - Moose Jaw, SK"],["",["2024-05-01","Wed, May 1"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/210.png","Prince George"],"2",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/208_284.png","Portland"],"5",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021121","Final","Final","h:mm a z"],"5769",["",""],"Veterans Memorial Coliseum - Portland, OR"],["",["2024-05-02","Thu, May 2"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/210.png","Prince George"],"6",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/208_284.png","Portland"],"1",["4","Final","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021122","Final","Final","h:mm a z"],"6138",["",""],"Veterans Memorial Coliseum - Portland, OR"],["",["2024-05-03","Fri, May 3"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/207.png","Moose Jaw"],"4",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/213.png","Saskatoon"],"5",["4","Final OT","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021115","Final OT","Final OT","h:mm a z"],"11173",["",""],"SaskTel Centre - Saskatoon, SK"],["",["2024-05-05","Sun, May 5"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/213.png","Saskatoon"],"3",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/207.png","Moose Jaw"],"4",["4","Final OT","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021116","Final OT","Final OT","h:mm a z"],"4582",["",""],"Moose Jaw Events Centre - Moose Jaw, SK"],["",["2024-05-06","Mon, May 6"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/208_284.png","Portland"]," ",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/210.png","Prince George"]," ",["2","20:00 1st","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021123","20:00 1st","20:00 1st","h:mm a z"],"",["",""],"CN Centre - Prince George, BC"],["",["2024-05-07","Tue, May 7"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/207.png","Moose Jaw"]," ",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/213.png","Saskatoon"]," ",["1","2024-05-07T19:00:00-06:00","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021117","2024-05-07T19:00:00-06:00","7:00 pm ST","h:mm a z"],"",["",""],"SaskTel Centre - Saskatoon, SK"],["",["2024-05-07","Tue, May 7"],["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/208_284.png","Portland"]," ",["https:\\/\\/assets.leaguestat.com\\/whl\\/logos\\/210.png","Prince George"]," ",["1","2024-05-07T19:00:00-07:00","https:\\/\\/chl.ca\\/whl\\/gamecentre\\/1021124","2024-05-07T19:00:00-07:00","7:00 pm PDT","h:mm a z"],"",["",""],"CN Centre - Prince George, BC"]]\t\t\t\t});
\t\t\t;
\t</script>
            `),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          GC: {
            Clock: {},
          },
        }),
    });
  const blades = await sportsChl("https://chl.ca/whl/schedule/all/284/");
  expect(blades[blades.length - 4].startDate).toBe("2024-05-05T06:00:00Z");
  expect(blades[blades.length - 4].sport).toBe("WHL");
  expect(blades[blades.length - 4].awayTeam.name).toBe("Saskatoon");
  expect(blades[blades.length - 4].awayTeam.logo).toBe(
    "https://assets.leaguestat.com/whl/logos/213.png",
  );
  expect(blades[blades.length - 4].awayScore).toBe("3");
  expect(blades[blades.length - 4].homeTeam.name).toBe("Moose Jaw");
  expect(blades[blades.length - 4].homeTeam.logo).toBe(
    "https://assets.leaguestat.com/whl/logos/207.png",
  );
  expect(blades[blades.length - 4].homeScore).toBe("4");
  expect(blades[blades.length - 4].location.description).toBe(
    "Moose Jaw Events Centre",
  );
  expect(blades[blades.length - 4].location.addressLocality).toBe(
    "Moose Jaw, SK",
  );
  expect(blades[blades.length - 4].description).toBe("Final OT");
});
