const {
    default: makeWASocket,
    WASocket, 
    AuthenticationState,
    WAMessage, 
    Contact, 
    SocketConfig, 
    DisconnectReason, 
    BaileysEventMap,
    GroupMetadata,
    AnyMessageContent,
    MessageType,
    MiscMessageGenerationOptions,
    BufferJSON,
    delay,
    proto,
    useSingleFileAuthState,
    downloadContentFromMessage,
    generateWAMessage,
    generateWAMessageFromContent,
    prepareWAMessageMedia
} = require('@adiwajshing/baileys')
const ffmpeg = require("fluent-ffmpeg")
const { color } = require("./lib/color")
const { exec, spawn } = require("child_process")
const moment = require("moment-timezone")
const ggs = require('google-it')
const os = require('os')
const fs = require("fs")
const zrapi = require('zrapi')
const speed = require('performance-now')
const crypto = require('crypto')
//const { webp2mp4File } = require("./lib/convert")
const { getBuffer, fetchJson, fetchText, formatp, jsonformat, getRandom, getGroupAdmins, runtime, sleep } = require("./lib/myfunc")

//database
const _registered = JSON.parse(fs.readFileSync('./database/registered.json'))
let register = JSON.parse(fs.readFileSync('./database/registered.json'))
let mess = JSON.parse(fs.readFileSync('./messages/response.json'))

let global = JSON.parse(fs.readFileSync("./settings.json"))
let {
ownerNumber,
ownerName,
botName
} = global

module.exports = async (conn, msg) => {
try {
            const type = Object.keys(msg.message)[0]
            body = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type == "templateButtonReplyMessage" && msg.message.templateButtonReplyMessage.selectedId) ? msg.message.templateButtonReplyMessage.selectedId : ''
            cmd = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message[type].caption ? msg.message[type].caption : (type == 'videoMessage') && msg.message[type].caption ? msg.message[type].caption : (type == 'extendedTextMessage') && msg.message[type].text ? msg.message[type].text : (type == 'listResponseMessage') && msg.message[type].singleSelectReply.selectedRowId ? msg.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && msg.message[type].selectedButtonId ? msg.message[type].selectedButtonId : ""
            button = (type == 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedDisplayText : ''
            budy = (type === 'conversation') ? msg.message.conversation : (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''
            selectedButton = (type == 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
            responseButton = (type == 'listResponseMessage') ? msg.message.listResponseMessage.title : ''
            if (conn.multi) {
            var prefix = /^[°•π÷×¶∆£¢€¥®™✓=|~zZ+×_*!#%^&./\\©^]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™✓=|~xzZ+×_*!#,|÷?;:%^&./\\©^]/gi) : '.'
            } else {
            if (conn.nopref) {
            var prefix = ''
            } else {
            var prefix = conn.prefa
            }
            }
            const command = body.startsWith(prefix) ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : ''
            const isCmd = body.startsWith(prefix)
            const from = msg.key.remoteJid
            const isGroup = from.endsWith('@g.us')
            const sender = isGroup ? msg.participant : msg.key.remoteJid
            const isOwner = ownerNumber.includes(sender) 
            budy = (type === "conversation") ? msg.message.conversation : (type === "extendedTextMessage") ? msg.message.extendedTextMessage.text : ""
            const pushname = msg.pushName
            //const teh = msg.key.fromMe ? msg.user.jid : msg.contacts[sender] || { notify: jid.replace(/@.+/, "") };
            //const pushnames = msg.key.fromMe ? msg.user.name : teh.notify || teh.vname || teh.name || "Null Name"
            const args = body.trim().split(/ +/).slice(1)
            const q = args.join(" ")
            const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
            //const totalchat = await conn.chats.all()
            const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
            const groupName = isGroup ? groupMetadata.subject : ''
            const groupId = isGroup ? groupMetadata.id : ''
            const groupMembers = isGroup ? groupMetadata.participants : ''
            const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
            const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
            const isGroupAdmins = groupAdmins.includes(sender) || false
            const content = JSON.stringify(msg.message)
            
            const createSerial = (size) => {
            return crypto.randomBytes(size).toString('hex').slice(0, size)
        }
        
            const sendButton5 = async (id, text1, desc1, yo) => {
// malink punya fazd
var buatpesan = await generateWAMessageFromContent(from, {
    "templateMessage": {
      "hydratedTemplate": {
        ...yo.message,
        "hydratedContentText": text1,
        "hydratedFooterText": desc1,
        "hydratedButtons": [
          {
            "urlButton": {
              "displayText": "Github Owner",
              "url": "https://github.com/yogiprasetya-09"
            }
          },
          {
            "callButton": {
              "displayText": "Nomer Owner",
              "phoneNumber": "0895613293360"
            }
          },
          {
            "quickReplyButton": {
              "displayText": "Donasi",
              "id": `${prefix}donasi`
            }
          },
          {
            "quickReplyButton": {
              "displayText": "Script",
              "id": `${prefix}sc`,
            }
          },
          {
            "quickReplyButton": {
              "displayText": "Owner",
              "id": `${prefix}owner`
            }
          }
        ]
      }
    }
  }, {})
conn.relayMessage(id, buatpesan.message, { messageId: buatpesan.key.id })
}
         const isImage = (type == 'imageMessage')
	const isVideo = (type == 'videoMessage')
	const isSticker = (type == 'stickerMessage')
	const isQuotedMsg = (type == 'extendedTextMessage')
	const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
	const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
	const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
	const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
	const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false

         const reply = (string) => {
        conn.sendMessage(from, { text: string, qouted: msg })
        }
        
        if (conn.mode == "self") {
            if (!msg.key.fromMe && !isOwner) return
            }
            
            if (conn.autoRead) {
            conn.sendReadReceipt(from, sender, [msg.key.id])
            }
        
        ////DAFTAR BUTTON BY IKY
      const daftar1 = `Hai kak  ${pushname}\n\nJangan lupa daftar dulu yah dengan cara klik tombol verify atau ketik !verify makasih ^^`
       const daftar2 = '```please click the button here\n©Created by yogi prasetya```'
       const daftar3 = [
            { urlButton: { displayText: `daftar dulu gan`, url : ``} },
            { quickReplyButton: { displayText: `verify!!`, id: `${prefix}verify` } }
        ]
        conn.createMessage = async (jidnya, kontennya, optionnya) => {
            return await generateWAMessage(jidnya, kontennya, {...optionnya,userJid: conn.authState.creds.me.id,upload: conn.waUploadToServer})
            }
        const sendContact = (jid, numbers, name, quoted, men) => {
            let number = numbers.replace(/[^0-9]/g, '')
            const vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + 'FN:' + name + '\n'
            + 'ORG:;\n'
            + 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
            + 'END:VCARD'
            return conn.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : men ? men : []},{ quoted: quoted })
            }
        
         if (isCmd && !isGroup) {
	    console.log(color('[COMMAND]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${prefix}${command} [${args.length}]`), 'from', color(pushname))
        }
        if (isCmd && isGroup) {
	    console.log(color('[COMMAND]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${prefix}${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
        }
        const getRegisteredRandomId = () => {
            return _registered[Math.floor(Math.random() * _registered.length)].id
        }
        const addRegisteredUser = (userid, sender, age, time, serials) => {
            const obj = { id: userid, name: sender, age: age, time: time, serial: serials }
            _registered.push(obj)
            fs.writeFileSync('./database/registered.json', JSON.stringify(_registered))
        }
        
        const checkRegisteredUser = (sender) => {
            let status = false
            Object.keys(_registered).forEach((i) => {
                if (_registered[i].id === sender) {
                    status = true
                }
            })
            return status
        }
        const isRegistered = checkRegisteredUser(sender)
        
        const textTemplateButtons = (from, text, footer, buttons) => {
            return conn.sendMessage(from, { text: text, footer: footer, templateButtons: buttons })
        }
        async function meta(url, text) {
        return require('zrapi').textpro(url, text)
        }
        
        async function downloadAndSaveMediaMessage (type_file, path_file) {
	    if (type_file === 'image') {
		var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
		let buffer = Buffer.from([])
		for await(const chunk of stream) {
		    buffer = Buffer.concat([buffer, chunk])
		}
		fs.writeFileSync(path_file, buffer)
		return path_file
	    } else if (type_file === 'video') {
		var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
		let buffer = Buffer.from([])
		for await(const chunk of stream) {
		    buffer = Buffer.concat([buffer, chunk])
		}
		fs.writeFileSync(path_file, buffer)
		return path_file
	    } else if (type_file === 'sticker') {
		var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
		let buffer = Buffer.from([])
		for await(const chunk of stream) {
		    buffer = Buffer.concat([buffer, chunk])
		}
		fs.writeFileSync(path_file, buffer)
		return path_file
	    } else if (type_file === 'audio') {
		var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
		let buffer = Buffer.from([])
		for await(const chunk of stream) {
		    buffer = Buffer.concat([buffer, chunk])
		}
		fs.writeFileSync(path_file, buffer)
		return path_file
	    }
	}
        switch(command){
//menu
        case "test":
        if (!isRegistered) return textTemplateButtons(from, daftar1, daftar2, daftar3)
        reply("aktif")
        break
        
        case 'menu':
        if (!isRegistered) return textTemplateButtons(from, daftar1, daftar2, daftar3)
        const menu = `
*S H I N N A  B O T Z ¥*

             *｢  SEARCH MENU  ｣*
            ⬡ ${prefix}wallpaper query
            ⬡ ${prefix}google query
            
            *｢  STICKER MENU  ｣*
            ⬡ ${prefix}stiker (reply gambar)
            
            *｢  GROUP MENU  ｣*
            ⬡ ${prefix}setppgc
            
            *｢  TEXT PRO MENU  ｣*
            ⬡ ${prefix}glitch text1 text2
            
`.trim()
if (conn.modelmenu == "gif") {
// gif buttons 5
await sendButton5(from, menu, 'by yogi prasetya', await conn.createMessage(from, {video: {url: "./media/tcp.mp4", caption: menu}, gifPlayback: true}))
} else if (conn.modelmenu == "image") {
// image button 5
await sendButton5(from, menu, 'by yogi prasetya', await conn.createMessage(from, {image: {url: "./media/shinna.jpeg", caption: menu}}))
}
                break

case 'donasi':
  reply('donasi via dana : 0895613293360')
break

case "owner":
if (!isRegistered) return textTemplateButtons(from, daftar1, daftar2, daftar3)
for (let i of ownerNumber) {
sendContact (from, i.split("@")[0], "Owner Bot - "+botName, msg)
}
break

case 'sc':
 reply("sc bot ini private karena di buat dari awal *#no malink* nanti kalau saya sudah bosan bakal saya kasih ")
break
        
//owner menu
        case "setprefix":
if (!isOwner) return reply("owner only")
if (!q) return reply("Masukan opts : [multi/nopref]")
if (q == "multi") {
conn.nopref = false
conn.multi = true
reply("Done change prefix to "+q)
} else if (q == "nopref") {
conn.multi = false
conn.nopref = true
reply("Done change prefix to "+q)
} else {
conn.nopref = false
conn.multi = false
conn.prefa = q
reply("Done change prefix to "+q)
}
break

case "setmenu":
if (!isOwner) return reply("owner only")
if (!q) return reply(`Masukan opts :\n
gif
image`)
if (q == "gif") {
conn.modelmenu = "gif"
reply("Done change menu to "+q)
} else if (q == "image") {
conn.modelmenu = "image"
reply("Done change menu to "+q)
} else {
reply(`Masukan opts :\n
gif
image`)
}
break

case 'public': {
                if (!isOwner) throw reply("khusus owner")
                conn.mode = true
                reply('Sukse Change To Public Usage')
            }
            break
            case 'self': {
                if (!isOwner) throw reply("khusus owner")
                conn.mode = false
                reply('Sukses Change To Self Usage')
            }
            break

case 'verify':
              
if (isRegistered) return reply('Akun kamu sudah terverfikasi')
const serialUser = createSerial(18)
             try {
				ppimg = await conn.profilePictureUrl(`${sender.split('@')[0]}@c.us`)
				} catch {
				ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
			    }
            veri = sender
            _registered.push(sender)
            fs.writeFileSync('./database/registered.json', JSON.stringify(_registered))
            addRegisteredUser(sender, serialUser)
             const anuu = `「 *REGISTRASI SUKSES* 」
*Terimakasih Sudah Mendaftarkan Diri Dalam Database Bot WhatsApp*

*🌹 Nama :* ${pushname}
*🌹 API :* +${sender.split('@')[0]}
*🌹 Serial:* ${serialUser}
*🌹 Total:* ${_registered.length} Pengguna


*S H I N A  B O T ¥*`
         kon = await getBuffer(`http://hadi-api.herokuapp.com/api/card/verify?nama=${encodeURI(pushname)}&member=${_registered.length}&seri=${serialUser}&pp=${ppimg}&bg=${ppimg}`)
               let message = await prepareWAMessageMedia({ image: kon }, { upload: conn.waUploadToServer })
     const template = generateWAMessageFromContent(from, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           imageMessage: message.imageMessage,
           hydratedContentText: `${anuu}`,
           hydratedFooterText: 'jangan lupa bernafas',
           hydratedButtons: [{
           urlButton: {
                                    displayText: 'thenks udah daftar',
                                    url: 'y'
                                }
                            }]
                        }
                    }
                }), { userJid: from, quoted: msg })
                conn.relayMessage(from, template.message, { messageId: template.key.id })
             console.log(color('[REGISTER]'), color(time, 'yellow'), 'Serial:', color(serialUser, 'cyan'), 'in', color(sender || groupName))
        // console.log(e)
            setTimeout( () => {
	    reply(`*Terimakasih Telah Terdaftar Di S H I N N A  B O T ¥*`)
	}, 2000)
        break

//sticker menu
if (!isRegistered) return textTemplateButtons(from, daftar1, daftar2, daftar3)
case 'sticker': case 'stiker': case 's':
		if (isImage || isQuotedImage) {
	           var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
	           var buffer = Buffer.from([])
	           for await(const chunk of stream) {
	              buffer = Buffer.concat([buffer, chunk])
	           }
	           var rand1 = 'sticker/'+getRandom('.jpg')
	           var rand2 = 'sticker/'+getRandom('.webp')
	           fs.writeFileSync(`./${rand1}`, buffer)
	           ffmpeg(`./${rand1}`)
		.on("error", console.error)
		.on("end", () => {
		  exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
		    conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
		    fs.unlinkSync(`./${rand1}`)
	                fs.unlinkSync(`./${rand2}`)
	              })
		 })
		.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
		.toFormat('webp')
		.save(`${rand2}`)
	        } else if (isVideo || isQuotedVideo) {
		 var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
		 var buffer = Buffer.from([])
		 for await(const chunk of stream) {
		   buffer = Buffer.concat([buffer, chunk])
		 }
	         var rand1 = 'sticker/'+getRandom('.mp4')
		 var rand2 = 'sticker/'+getRandom('.webp')
	             fs.writeFileSync(`./${rand1}`, buffer)
	             ffmpeg(`./${rand1}`)
		  .on("error", console.error)
		  .on("end", () => {
		    exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
		      conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
		      fs.unlinkSync(`./${rand1}`)
		      fs.unlinkSync(`./${rand2}`)
		    })
		  })
		 .addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
		 .toFormat('webp')
		 .save(`${rand2}`)
                } else {
	           reply(`Kirim gambar/vidio dengan caption ${command} atau balas gambar/vidio yang sudah dikirim\nNote : Maximal vidio 10 detik!`)
	        }
                break
                
                case 'toimg': case 'stickertoimg': case 'stoimg': case 'stikertoimg': 
                if (!isRegistered) return textTemplateButtons(from, daftar1, daftar2, daftar3)
		if (isQuotedSticker) {
	    	let media = await downloadAndSaveMediaMessage('sticker', 'sticker.webp')
	    	if (msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated) {
                        await reply("wait")
		    } else {
                        await reply("wait")
	    	    let ran = getRandom('.png')
		        exec(`ffmpeg -i ${media} ${ran}`, async (err) => {
			    fs.unlinkSync(media)
			    if (err) return textImg('Gagal :V')
			    await conn.sendMessage(from, { image: fs.readFileSync(ran), caption: "nih cog" }, { quoted: msg }).then(res => fs.unlinkSync(ran))
			    })
		    }
                } else {
                    reply("mana kontol stikernya")
                }
            break
                
//downloader menu
        
        
        case 'google':
        if (!isRegistered) return textTemplateButtons (from, daftar1, daftar2, daftar3)
              if (!q) return reply("lu mau nyari apaan tod?")
              ss = await getBuffer(`https://api.apiflash.com/v1/urltoimage?access_key=f307ca1dc9824ae89caa976435c03178&url=http://www.google.com/search?q=${q}&oq={q}&aqs=chrome..69i57j0i433i512l2j0i512l2.858j0j4&client=ms-android-oppo&sourceid=chrome-mobile&ie=UTF-8`)
              reply('sebentar lagi nyari')
              if(q == undefined || q == ' ') return reply(`*Hasil Pencarian : ${q}* tidak ditemukan`)
              ggs({ 'query': q }).then(results => {
              vars = `_*Hasil Pencarian : ${q}*_\n`
              for (let i = 0; i < results.length; i++) {
              vars +=  `\n═════════════════\n\n*Judul:* ${results[i].title}\n\n*Deskripsi:* ${results[i].snippet}\n\n*Link:* ${results[i].link}\n\n`
} 
               conn.sendMessage(from, {image: ss, text: vars, quoted : msg})
               }).catch(e => {
               console.log(e)
               reply(`${e}`)
})
               break
               case 'ssweb':
                if (!isRegistered) return textTemplateButtons (from, daftar1, daftar2, daftar3)
             if (args.length == 0) return reply(`Example: ${prefix + command} https://nekopoi.care/`)
             reply('wait bnag')
             ini_link = args[0]
             ini_buffer = await getBuffer(`https://api.screenshotmachine.com/?key=92e796&url=${ini_link}&dimension=1920x1080`)
             await conn.sendMessage(from, { image: ini_buffer,  caption: `result` })
             break
             case 'ping': case 'botstatus': case 'statusbot': {
                const used = process.memoryUsage()
                const cpus = os.cpus().map(cpu => {
                    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
			        return cpu
                })
                const cpu = cpus.reduce((last, cpu, _, { length }) => {
                    last.total += cpu.total
                    last.speed += cpu.speed / length
                    last.times.user += cpu.times.user
                    last.times.nice += cpu.times.nice
                    last.times.sys += cpu.times.sys
                    last.times.idle += cpu.times.idle
                    last.times.irq += cpu.times.irq
                    return last
                }, {
                    speed: 0,
                    total: 0,
                    times: {
			            user: 0,
			            nice: 0,
			            sys: 0,
			            idle: 0,
			            irq: 0
                }
                })
                let timestamp = speed()
                let latensi = speed() - timestamp
                neww = performance.now()
                oldd = performance.now()
                respon = `
Speed: ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}

Info Server:
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}

${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
`.trim()
                reply(respon)
            }
            break
            case 'setppgrup': case 'setppgc':
	        if (!isGroup) return reply(mess.OnlyGrup)
		if (!groupAdmins) return reply(mess.GrupAdmin)
		if (!isBotGroupAdmins) return reply(mess.BotAdmin)
		if (isImage || isQuotedImage) {
		  var media = await downloadAndSaveMediaMessage('image', `ppgc${from}.jpeg`)
	          await conn.updateProfilePicture(from, { url: media })
		  .then( res => {
		    reply(`Sukses`)
		    fs.unlinkSync(media)
		  }).catch(() => reply(mess.error.api))
		} else {
	          reply(`Kirim/balas gambar dengan caption ${command}`)
		}
		break
	    case 'setnamegrup': case 'setnamegc':
	        if (!isGroup) throw reply(mess.OnlyGrup)
		if (!isGroupAdmins) return reply(mess.GrupAdmin)
		if (!isBotGroupAdmins) return reply(mess.BotAdmin)
		if (!q) return reply(`Kirim perintah ${command} teks`)
		await conn.groupUpdateSubject(from, q)
	        .then( res => {
		  reply(`Sukses`)
		}).catch(() => reply(mess.error.api))
	        break
	        case 'add': {
	if (!isGroup) throw reply('khisus group')
                if (!isBotGroupAdmins) throw reply('jadikan bot sebagai admin')
                if (!isGroupAdmins) throw reply('khsus admin group')
	let users = quoted ? quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
	await conn.groupParticipantsUpdate(from, [users], 'add').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
    }
    break
		
            case 'hidetag':
                if (!isGroup) return reply('khusus group!!!')
                conn.sendMessage(from, { text : q ? q : '' , mentions: groupMembers.map(a => a.id)})
                break
                
                case 'wallpaper': {
                if (!q) throw reply('Masukkan Query Title')
		let { wallpaper } = require('./lib/scraper')
                anu = await wallpaper(q)
                result = anu[Math.floor(Math.random() * anu.length)]
		let buttons = [
                    {buttonId: `${prefix}wallpaper ${q}`, buttonText: {displayText: 'Next Image'}, type: 1}
                ]
                let buttonMessage = {
                    image: { url: result.image[0] },
                    caption: `➣ Title : ${result.title}\n➣ Category : ${result.type}\n➣ Detail : ${result.source}\n➣ Media Url : ${result.image[2] || result.image[1] || result.image[0]}`,
                    footer: 'shinna botz',
                    buttons: buttons,
                    headerType: 4
                }
                conn.sendMessage(from, buttonMessage, { quoted: msg })
            }
            case 'glitch': {
            if (!q) throw reply('example: !glitch yogi prasetya')
        txt1 = args[0]
                    txt2 = args[1]
        result = await meta('https://textpro.me/create-a-glitch-text-effect-online-free-1026.html', [`${txt1}`, `${txt2}`])
	let buttons = [
                    {buttonId: `${prefix}donate`, buttonText: {displayText: 'Donate'}, type: 1}
                ]
                let buttonMessage = {
                    image: { url: result },
                    caption: `nih`,
                    footer: 'shinna botz',
                    buttons: buttons,
                    headerType: 4
                }
                conn.sendMessage(from, buttonMessage, { quoted: msg})
            }
            break
 
  } 
     if (budy.startsWith("> ")) {
        if (!isOwner) return reply("khusus owner")
        var bang = await eval(`;(async () => { return ${budy.slice(2)} })();`)
        reply(jsonformat(bang))
        }
        
        if (budy.startsWith("$ ")) {
        if (!isOwner) return reply("khusus owner")
        exec(budy.slice(2), async (err, stdout) => {
        if (err) return reply(err)
        reply(stdout)
        })
        }
} catch (e) {
            console.log(color('[ERROR]', 'red'), e)
        }
}