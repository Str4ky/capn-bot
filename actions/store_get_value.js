module.exports = {

    name: "Store GET Value",
  
    section: "Straky's Stuff",
  
    subtitle(data) {
      return `Store GET Value: ${data.get}`;
    },

    variableStorage(data, varType) {
      const type = parseInt(data.storage, 10);
      if (type !== varType) return;
      let dataType = "GET Value";
      return [data.varName, dataType];
    },
  
    meta: { version: "1.0.0", preciseCheck: true, author: null, authorUrl: null, downloadUrl: null },
  
  
    fields: ["url", "get", "storage", "varName"],
  
    html(isEvent, data) {
      return `
      <div style="padding-top: 8px;">
        <span class="dbminputlabel">URL</span><br>
        <input type="text" class="round" id="url" placeholder="URL">
      </div>
  
      <br>

      <div>
          <span class="dbminputlabel">GET variable</span><br>
          <input type="text" class="round" id="get" placeholder="GET variable name">
      </div>
      
      <br>
  
      <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName"></store-in-variable>`;
    },
  
    init() {},
  
    async action(cache) {
      const data = cache.actions[cache.index];
      const url = this.evalMessage(data.url, cache);
      const get  = this.evalMessage(data.get, cache);
      let result;

      const query = url.substring(url.indexOf('?') + 1)
      const vars = query.split('&');
      
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === get) {
            result = decodeURIComponent(pair[1]);
            break;
        }
      }

      if (result !== undefined) {
        const storage = parseInt(data.storage, 10);
        const varName = this.evalMessage(data.varName, cache);
        this.storeValue(result, storage, varName, cache);
      }
      this.callNextAction(cache);
    },
  
    mod() {},
  };