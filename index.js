const { default: makeWASocket, useSingleFileAuthState, DisconnectReason, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("@adiwajshing/baileys")
const { state, saveState } = useSingleFileAuthState(`./session.json`)
const P = require('pino')
const { color, Log } = require("./lib/color")
const fs = require("fs")

require('./shinna')
nocache("./shinna", (module) => console.log(Log(`Module "${module}" terupdate`)))
nocache("./index", (module) => console.log(Log(`Module "${module}" terupdate`)))
///nocache("./setting.json", (module) => console.log(Log(`Module "${module}" terupdate`)))

const getVersionWaweb = () => {
    let version
    try {
        let a = fetchJson('https://web.whatsapp.com/check-update?version=1&platform=web')
        version = [a.currentVersion.replace(/[.]/g, ', ')]
    } catch {
        version = [2, 2204, 13]
    }
    return version
}

async function start() {
const conn = makeWASocket({
      printQRInTerminal: true, 
      browser: ['Shiina Bot','Firefox','1.0.0'],
      logger: P({ level: 'debug' }),
      auth: state,
      version: getVersionWaweb() || [2, 2204, 13]
})
  conn.prefa = "."
  conn.multi = true
  conn.nopref = false
  conn.mode = "public"
  conn.autoRead = true
  conn.modelmenu = "gif"
    
    conn.ev.on('messages.upsert', async m => {
    try {
    if (!m.messages) return
        const msg = m.messages[0]
        require('./shinna')(conn, msg)
        } catch (err) {
        console.log(err)
        }
    })

    conn.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            console.log('connection closed, try to restart')
            lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut 
            ? start()
            : console.log('Wa web terlogout.')
        }
    })
}

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
 function nocache(module, cb = () => { }) {
    console.log(color(`Module '${module}'`), color(`Dipantau Tukang Bakso Team`, "cyan"))
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

start()
