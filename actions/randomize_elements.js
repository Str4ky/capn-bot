module.exports = {

    name: "Reply To Message",
  
    section: "Straky's Stuff",
  
    subtitle(data) {
      return `Reply to Message: ${data.elements}`;
    },

    variableStorage(data, varType) {
      const type = parseInt(data.storage, 10);
      if (type !== varType) return;
      let dataType = "Source Message";
      return [data.varName, dataType];
    },
  
    meta: { version: "1.0.0", preciseCheck: true, author: null, authorUrl: null, downloadUrl: null },
  
  
    fields: ["elements", "storage", "varName"],
  
    html(isEvent, data) {
      return `
      <div style="padding-top: 8px;">
        <span class="dbminputlabel">Elements</span><br>
        <input type="text" class="round" id="elements" placeholder="Elements">
        <p style="padding-top: 8px;">Use this format ["element_1", "element_2", "element_3"] to store elements</p>
      </div>
      
      <br>
  
      <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName"></store-in-variable>`;
    },
  
    init() {},
  
    async action(cache) {
      const data = cache.actions[cache.index];
      const elements = this.evalMessage(data.elements, cache);
      let result;

      let table = JSON.parse(elements);
      let length = table.length;
      let random = Math.floor(Math.random() * length);
      result = table[random];

      if (result !== undefined) {
        const storage = parseInt(data.storage, 10);
        const varName = this.evalMessage(data.varName, cache);
        this.storeValue(result, storage, varName, cache);
      }
      this.callNextAction(cache);
    },
  
    mod() {},
  };