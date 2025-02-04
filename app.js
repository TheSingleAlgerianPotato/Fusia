addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method === 'POST') {
    try {
      const data = await request.json();
      const targetChatId = -1002273008648;

      if (data.message && data.message.text && data.message.chat && data.message.chat.id) {
        const receivedChatId = data.message.chat.id;
        const userMessage = data.message.text;
        const BOT_TOKEN = '8060647515:AAHou4zNZ5Io0wunvZMsxSVoYI5y2Ok_5Ig'; // Example token - REPLACE THIS IMMEDIATELY

        if (receivedChatId === targetChatId || (data.message && data.message.new_chat_member && receivedChatId === targetChatId)) {

          const POLLINATIONS_API_URL = (userMessage) =>
            `https://text.pollinations.ai/${encodeURIComponent(userMessage)}?system=your%20name%20is%20Fusia%2C%20developed%20by%20ProBlinds%2C%20a%20non-profit%20Algerian%20team%20specialized%20in%20accessibility%20technologies%20and%20assisting%20the%20blind%20individually%20impaired%2C%20you%20are%20powered%20by%20the%20language%20model%20mirage%20X0%20BETA%2C%20you%20give%20light-hearted%20comforting%20and%20funny%20responses&model=deepseek`;

          const apiUrl = POLLINATIONS_API_URL(userMessage);
          const response = await fetch(apiUrl, { timeout: 10000 });
          const aiResponse = await response.text();

          const telegramApiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
          await fetch(telegramApiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              chat_id: targetChatId,
              text: aiResponse
            })
          });

          return new Response("OK");
        } else {
          return new Response("Message not from the target group. Ignoring.", { status: 200 });
        }
      }
      else if (data.message && data.message.new_chat_member && data.message.chat && data.message.chat.id){
        const receivedChatId = data.message.chat.id;
        const targetChatId = -1002273008648;
        const BOT_TOKEN = '8060647515:AAHou4zNZ5Io0wunvZMsxSVoYI5y2Ok_5Ig';
        if (receivedChatId === targetChatId){
        const telegramApiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        await fetch(telegramApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chat_id: targetChatId,
            text: "Welcome to the group!"
          })
        });
        return new Response("OK");
      }
      else{
        return new Response("Message not from the target group. Ignoring.", { status: 200 }); //Don't return an error
      }
    }
      else {
        return new Response("Invalid request (missing message text or chat ID)", { status: 400 });
      }
    } catch (error) {
      console.error("Error:", error);
      return new Response("Error processing request", { status: 500 });
    }
  }

  return new Response("Invalid request", { status: 400 });
                                                }
