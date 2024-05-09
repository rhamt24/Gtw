const prefixes = ['!', '+', '#', '.', '/'];

const commands = {
    greeting: new RegExp('^[' + prefixes.join('') + ']halo$'),
    quake: new RegExp('^[' + prefixes.join('') + ']gempa$'),
    tourl: new RegExp('^[' + prefixes.join('') + ']tourl$')
};

module.exports = commands;

