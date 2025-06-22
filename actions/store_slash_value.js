module.exports = {

    name: "Store URL Slash Value",
  
    section: "Straky's Stuff",
  
    subtitle(data) {
      return `Store URL Slash Value: "${data.url}"`;
    },

    variableStorage(data, varType) {
      const type = parseInt(data.storage, 10);
      if (type !== varType) return;
      let dataType = "Slash Value";
      return [data.varName, dataType];
    },
  
    meta: { version: "1.0.0", preciseCheck: true, author: null, authorUrl: null, downloadUrl: null },
  
  
    fields: ["url", "storage", "varName"],
  
    html(isEvent, data) {
      return `
      <div style="padding-top: 8px;">
        <span class="dbminputlabel">URL</span><br>
        <input type="text" class="round" id="url" placeholder="URL">
      </div>
      
      <br>
  
      <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName"></store-in-variable>`;
    },
  
    init() {},
  
    async action(cache) {
      const data = cache.actions[cache.index];
      const url = this.evalMessage(data.url, cache);
      let result;

      const urlParts = url.split('/');

      result = urlParts[urlParts.length - 1];

      if (result !== undefined) {
        const storage = parseInt(data.storage, 10);
        const varName = this.evalMessage(data.varName, cache);
        this.storeValue(result, storage, varName, cache);
      }
      this.callNextAction(cache);
    },
  
    mod() {},
  };