module.exports = {

    name: "Get Word From Text",
  
    section: "Straky's Stuff",
  
    subtitle(data) {
      return `Get Word From Text: ${data.varName}`;
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
        <span class="dbminputlabel">Word's order</span><br>
        <select id="order" class="round" style="width: 100%;">
            <option value="0" selected>First word</option>
            <option value="1">Last word</option>
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
      const order = parseInt(data.order, 10);
      const words = variable.split(/\s+/).map(word => word.replace(/[^\w]/g, '')).filter(word => word.length > 0);
      let word;
      let result;

      switch (order) {
        case 0:
          result = words.length > 0 ? words[0] : '';
          break;
        case 1:
          result = words.length > 0 ? words[words.length - 1] : '';
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