module.exports = {

  name: "Keep Characters From Text",

  section: "Straky's Stuff",

  subtitle(data) {
    return `Keep Characters From Text: ${data.varName}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    let dataType = "Text";
    return [data.varName2, dataType];
  },

  meta: { version: "1.0.0", preciseCheck: true, author: null, authorUrl: null, downloadUrl: null },


  fields: ["varName", "order" , "num", "storage", "varName2"],

  html(isEvent, data) {
    return `
    <retrieve-from-variable dropdownLabel="Variable" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>

    <br><br><br>

    <div style="padding-top: 8px;">
      <div style="float: left; width: calc(37% - 12px);">
        <span class="dbminputlabel">Characters's order</span><br>
        <select id="order" class="round" style="width: 100%;">
            <option value="0" selected>First characters</option>
            <option value="1">Last characters</option>
        </select>
      </div>
      <div style="float: right; width: calc(62% - 12px);">
        <span class="dbminputlabel">Number of characters</span><br>
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
    const order = parseInt(data.order, 10);
    const number = parseInt(this.evalMessage(data.num, cache), 10);
    let result;

    switch (order) {
      case 0:
        result = variable.slice(0, number);
        break;
      case 1:
        result = variable.slice(-number);
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