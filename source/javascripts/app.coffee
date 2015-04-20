game = new Phaser.Game 250*3, 445*3, Phaser.CANVAS, 'drawing-canvas'

game.state.add('boot', new App.Boot())
game.state.add('loader', new App.Loader())
game.state.add('help', new App.Help())
game.state.add('game', new App.Game())

game.state.start('boot')

window.game = game
