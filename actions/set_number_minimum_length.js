module.exports = {

    name: "Set Number Minimum Length",
  
    section: "Straky's Stuff",
  
    subtitle(data) {
      return `Set Number Minimum Length: "${data.varName}"`;
    },
  
    variableStorage(data, varType) {
      const type = parseInt(data.storage, 10);
      if (type !== varType) return;
      let dataType = "Number";
      return [data.varName2, dataType];
    },
  
    meta: { version: "1.0.0", preciseCheck: true, author: null, authorUrl: null, downloadUrl: null },
  
  
    fields: ["varName", "length", "storage", "varName2"],
  
    html(isEvent, data) {
      return `
  <retrieve-from-variable dropdownLabel="Variable" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>
  
  <br><br><br>
  
  <div style="padding-top: 8px;">
      <span class="dbminputlabel">The number's minimum length</span><br>
      <input type="number" class="round" id="length" placeholder="Number's length">
  </div>

  <br>
  
  <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>`;
    },
  
    init() {},
  
    async action(cache) {
      const data = cache.actions[cache.index];
      const varName = this.evalMessage(data.varName, cache);
      const type = parseInt(data.storage, 10);
      const length = parseInt(data.length, 10);
      const variable = this.getVariable(type, varName, cache);
      let result = String(variable).padStart(length, "0");
      if (result !== undefined) {
        const storage = parseInt(data.storage, 10);
        const varName2 = this.evalMessage(data.varName2, cache);
        this.storeValue(result, storage, varName2, cache);
      }
      this.callNextAction(cache);
    },
  
    mod() {},
  };