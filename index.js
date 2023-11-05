// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
import venom from'venom-bot';
 venom
 .create(
    //session
    'sessionName', //Pass the name of the client you want to start the bot
    //catchQR
    (base64Qrimg, asciiQR, attempts, urlCode) => {

      console.log('Number of attempts to read the qrcode: ', attempts);
      console.log('Terminal qrcode: ', asciiQR);
      console.log('base64 image string qrcode: ', base64Qrimg);
      console.log('urlCode (data-ref): ', urlCode);
    },
    // statusFind
    (statusSession, session) => {
      console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || initWhatsapp || erroPageWhatsapp || successPageWhatsapp || waitForLogin || waitChat || successChat
      //Create session wss return "serverClose" case server for close
      console.log('Session name: ', session);
    },
    // options
    {
      browserPathExecutable: '/usr/bin/google-chrome',
      folderNameToken: 'tokens', //folder name when saving tokens
      mkdirFolderToken: './Token', //folder directory tokens, just inside the venom folder, example:  { mkdirFolderToken: '/node_modules', } //will save the tokens folder in the node_modules directory
      headless: 'new', // you should no longer use boolean false or true, now use false, true or 'new' learn more https://developer.chrome.com/articles/new-headless/
      devtools: false, // Open devtools by default
      debug: false, // Opens a debug session
      logQR: true, // Logs QR automatically in terminal
      browserWS: '', // If u want to use browserWSEndpoint
      browserArgs:  [
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-setuid-sandbox',
                '--no-sandbox'
            ] , // Original parameters  ---Parameters to be added into the chrome browser instance
      addBrowserArgs: [''], // Add broserArgs without overwriting the project's original
      puppeteerOptions: {headless:true}, // Will be passed to puppeteer.launch
      disableSpins: true, // Will disable Spinnies animation, useful for containers (docker) for a better log
      disableWelcome: true, // Will disable the welcoming message which appears in the beginning
      updatesLog: true, // Logs info updates automatically in terminal
      autoClose: 60000, // Automatically closes the venom-bot only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
      createPathFileToken: false, // creates a folder when inserting an object in the client's browser, to work it is necessary to pass the parameters in the function create browserSessionToken
  
    },

    // BrowserInstance
    (browser, waPage) => {
      console.log('Browser PID:', browser.process().pid);
      waPage.screenshot({ path: 'screenshot.png' });
    }
  )
  .then((client) => {
    start(client);
  })
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {

  client.sendText('923320843832@c.us','Bot started') 
  client.onMessage((message) => {
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Welcome Venom 🕷')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    } 
  });
}