module.exports = {

    name: "Delimit Number",
  
    section: "Straky's Stuff",
  
    subtitle(data) {
      return `Delimit Number: "${data.varName}"`;
    },
  
    variableStorage(data, varType) {
      const type = parseInt(data.storage, 10);
      if (type !== varType) return;
      let dataType = "Delimited Number";
      return [data.varName2, dataType];
    },
  
    meta: { version: "1.0.0", preciseCheck: true, author: null, authorUrl: null, downloadUrl: null },
  
  
    fields: ["varName", "char", "storage", "varName2"],
  
    html(isEvent, data) {
      return `
  <retrieve-from-variable dropdownLabel="Variable" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>
  
  <br><br><br>
  
  <div style="padding-top: 8px;">
      <span class="dbminputlabel">The number's delimiter</span><br>
      <select id="char" class="round">
          <option value="0" selected>Space</option>
          <option value="1">,</option>
          <option value="2">.</option>
          <option value="3">;</option>
      </select>
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
      const char = parseInt(data.char, 10);
      let options = { useGrouping: true, maximumFractionDigits: 0 };
      let result;
      switch (char) {
        case 0:
          result = variable.toLocaleString('en', options).replace(/,/g, ' ');
          break;
        case 1:
          result = variable.toLocaleString('en', options).replace(/,/g, ',');
          break;
        case 2:
          result = variable.toLocaleString('en', options).replace(/,/g, '.');
          break;
        case 3:
          result = variable.toLocaleString('en', options).replace(/,/g, ';');
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