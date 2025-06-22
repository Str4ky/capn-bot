module.exports = {

  name: "Delimit Text",

  section: "Straky's Stuff",

  subtitle(data) {
    return `Delimit Text: "${data.varName}"`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    let dataType = "Delimited Text";
    return [data.varName2, dataType];
  },

  meta: { version: "1.0.0", preciseCheck: true, author: null, authorUrl: null, downloadUrl: null },


  fields: ["varName", "char", "num", "storage", "varName2"],

  html(isEvent, data) {
    return `
<retrieve-from-variable dropdownLabel="Variable" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>

<br><br><br>

<div style="padding-top: 8px;">
  <div style="float: left; width: calc(37% - 12px);">
    <span class="dbminputlabel">The text's delimiter</span><br>
    <select id="char" class="round" style="width: 100%;">
      <option value="0" selected>Space</option>
      <option value="1">,</option>
      <option value="2">.</option>
      <option value="3">;</option>
      <option value="4">:</option>
      <option value="5">|</option>
      <option value="6">-</option>
      <option value="7">_</option>
    </select>
  </div>
  <div style="float: right; width: calc(62% - 12px);">
    <span class="dbminputlabel">Number of each block</span><br>
    <input type="number" id="num" name="num" min="0" class="round" style="width: 100%;">
  </div>
  <br style="clear: both;" />
</div>


<br>

<store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const varName = this.evalMessage(data.varName, cache);
    const type = parseInt(data.storage, 10);
    const variable = this.getVariable(type, varName, cache);
    const number = parseInt(this.evalMessage(data.num, cache), 10);
    const char = parseInt(data.char, 10);
    let result;
    switch (char) {
      case 0:
        result = variable.replace(new RegExp(`(.{${number}})`, 'g'), '$1 ').slice(0);
        break;
      case 1:
        result = variable.replace(new RegExp(`(.{${number}})`, 'g'), '$1,').slice(0);
        break;
      case 2:
        result = variable.replace(new RegExp(`(.{${number}})`, 'g'), '$1.').slice(0);
        break;
      case 3:
        result = variable.replace(new RegExp(`(.{${number}})`, 'g'), '$1;').slice(0);
        break;
      case 4:
        result = variable.replace(new RegExp(`(.{${number}})`, 'g'), '$1:').slice(0);
        break;
      case 5:
        result = variable.replace(new RegExp(`(.{${number}})`, 'g'), '$1|').slice(0);
        break;
      case 6:
        result = variable.replace(new RegExp(`(.{${number}})`, 'g'), '$1-').slice(0);
        break;
      case 7:
        result = variable.replace(new RegExp(`(.{${number}})`, 'g'), '$1_').slice(0);
        break;
      default:
        break;
    }
    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName2 = this.evalMessage(data.varName2, cache);
      this.storeValue(result, storage, varName2, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};