module.exports = {

    name: "Reply To Message",
  
    section: "Straky's Stuff",
  
    subtitle(data) {
      return `Reply to Message: ${data.varName}`;
    },

    variableStorage(data, varType) {
      const type = parseInt(data.storage, 10);
      if (type !== varType) return;
      let dataType = "Replied Message";
      return [data.varName2, dataType];
    },
  
    meta: { version: "1.0.0", preciseCheck: true, author: null, authorUrl: null, downloadUrl: null },
  
  
    fields: ["message", "varName", "content" , "storage", "varName2"],
  
    html(isEvent, data) {
      return `
      <message-input dropdownLabel="Source Message" selectId="message" variableContainerId="varNameContainer" variableInputId="varName"></message-input>

      <br><br><br>

      <div style="padding-top: 8px;">
        <span class="dbminputlabel">Reply Content</span><br>
        <textarea type="text" class="round" id="content" placeholder="Message Content" style="height: 100px;"></textarea>
      </div>
      
      <br>
      
      <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>`;
    },
  
    init() {},
  
    async action(cache) {
      const data = cache.actions[cache.index];
      const message = await this.getMessageFromData(data.message, data.varName, cache);
      const content = this.evalMessage(data.content, cache);
      let result;

        await message.reply(content).then((msg) => {
          result = msg;
        });

      if (result !== undefined) {
        const storage = parseInt(data.storage, 10);
        const varName2 = this.evalMessage(data.varName2, cache);
        this.storeValue(result, storage, varName2, cache);
      }
      this.callNextAction(cache);
    },
  
    mod() {},
  };