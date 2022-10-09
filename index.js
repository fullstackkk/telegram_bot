const TelegramApi = require('node-telegram-bot-api');
const { gameOptions, againOptions } = require('./options')
const token = '5169490204:AAFqL1EUR-OLNZ4iVytNP9PWorjjgnG_0Ag';

const bot = new TelegramApi(token, { polling: true })

const chats = {}



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Я загадал цыфру от 0 до 9 , а ты ее отгадай`, gameOptions)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber
    await bot.sendMessage(chatId, 'Отгадывай bitch')
}

const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'Начальное приветствие' },
        { command: '/info', description: 'Твое имя' },
        { command: '/game', description: 'Сыграть в игру' },

    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        const userName = msg.chat.username;

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/1.webp')
            return bot.sendMessage(chatId, `привет ${userName} это телеграмм бот для приобритения подписки на VPN `)

        }

        if (text === '/info') {
            return bot.sendMessage(chatId, `привет ${userName}`)
        }

        if (text === '/game') {
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, 'я тебя не понимаю , попробуй еще раз ')
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId)
        }
        if (chats[chatId] == data) {
            return bot.sendMessage(chatId, 'поздравляю , ты отгадал ', againOptions)
        } else {
            return bot.sendMessage(chatId, `ты не отгадал , число которое я загадал ${chats[chatId]}`, againOptions)
        }


    })
}

start()