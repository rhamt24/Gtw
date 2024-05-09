const prefixes = ['!', '+', '#', '.', '/'];

const commands = {
    greeting: new RegExp('^[' + prefixes.join('') + ']halo$'),
    tagAll: new RegExp('^[' + prefixes.join('') + ']tagall$'),
    quake: new RegExp('^[' + prefixes.join('') + ']gempa$'),
    tourl: new RegExp('^[' + prefixes.join('') + ']tourl$')
};

module.exports = commands;

