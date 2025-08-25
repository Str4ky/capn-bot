module.exports = {
  name: "Store Forum Post Info",
  section: "Straky's Stuff",

  subtitle(data) {
    const info = [
      "Message Content",
      "Attachments (URLs)",
      "Author ID",
      "Author Tag",
      "Message ID",
      "Forum Parent ID"
    ];
    return `Store Forum Post Info: ${info[parseInt(data.info, 10)]}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    let dataType = "Unknown";
    switch (parseInt(data.info, 10)) {
      case 0: dataType = "Text"; break;
      case 1: dataType = "List"; break;
      case 2: dataType = "User ID"; break;
      case 3: dataType = "Text"; break;
      case 4: dataType = "Message ID"; break;
      case 5: dataType = "Channel ID"; break;
    }
    return [data.varName, dataType];
  },

  fields: ["threadId", "info", "storage", "varName"],

  html(isEvent, data) {
    return `
<div style="padding-top: 8px;">
  <span class="dbminputlabel">Source Thread/Post ID</span><br>
  <input type="text" class="round" id="threadId">
</div>

<br>

<div>
  <span class="dbminputlabel">Source Info</span><br>
  <select id="info" class="round">
    <option value="0" selected>Message Content</option>
    <option value="1">Attachments (URLs)</option>
    <option value="2">Author ID</option>
    <option value="3">Author Tag</option>
    <option value="4">Message ID</option>
    <option value="5">Forum Parent ID</option>
  </select>
</div>

<br>

<store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const threadId = this.evalMessage(data.threadId, cache);
    const info = parseInt(data.info, 10);
    const client = this.getDBM().Bot.bot;

    let result;

    try {
      const thread = await client.channels.fetch(threadId);
      if (thread && thread.isThread()) {
        let starter = null;
        try {
          starter = await thread.fetchStarterMessage().catch(() => null);
        } catch {}
        if (!starter) {
          const messages = await thread.messages.fetch({ limit: 1, after: 0 }).catch(() => null);
          starter = messages?.first() ?? null;
        }

        if (starter) {
          switch (info) {
            case 0: result = starter.content; break;
            case 1: result = starter.attachments.map(a => a.url); break;
            case 2: result = starter.author?.id; break;
            case 3: result = starter.author?.tag; break;
            case 4: result = starter.id; break;
          }
        }

        switch (info) {
          case 5: result = thread.parentId; break;
        }
      }
    } catch (err) {
      console.error("Erreur dans Store Forum Post Info:", err);
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