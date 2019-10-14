import { parseRaidDB } from './lua_parse';

const simpleRaid = `
RaidDB = {
  ["20191013-DZTS-TJJE-HTTT-XWMZAKWERCGX"] = {
      {
          ["EVENT_TYPE"] = "RAID_START",
          ["EVENT_DATA"] = {
              ["Time"] = 1571004996,
              ["Players"] = {
              },
          },
      }, -- [1]
      {
          ["EVENT_TYPE"] = "RAID_END",
          ["EVENT_DATA"] = {
              ["Time"] = 1571005003,
          },
      }, -- [2]
  },
  ["20191013-TEXQ-HIKQ-IFVM-KZUYMJTOQDSX"] = {
      {
          ["EVENT_TYPE"] = "RAID_START",
          ["EVENT_DATA"] = {
              ["Time"] = 1571005015,
              ["Players"] = {
                  "Acrux", -- [1]
                  "Adow", -- [2]
                  "Alexisa", -- [3]
              },
          },
      }, -- [1]
      {
          ["EVENT_TYPE"] = "RAID_END",
          ["EVENT_DATA"] = {
              ["Time"] = 1571005019,
          },
      }, -- [2]
  },
}`;

test('it should process a serialized lua object', () => {
  const output = parseRaidDB(simpleRaid);
  
  if(output.errors.length) {
    console.log(output.errors);
  }

  expect(output.errors.length).toBe(0);
  expect(output.result.length).toBe(2);
  
  // expect(output['20191013-DZTS-TJJE-HTTT-XWMZAKWERCGX'].length).toBe(2);
  // expect(output['20191013-TEXQ-HIKQ-IFVM-KZUYMJTOQDSX'.length]).toBe(2);
});