class App.Game

  camera_speed: 3
  NUMBER_OF_PAGES = 20

  create_page = ->
    page = game.add.graphics(0, 0);
    page.beginFill(0xFFFFFF, 1);
    page.drawRect(margin, margin, game.width - (margin * 2), game.height - (margin * 2))
    return page

  preload: ->


  create: ->
    App.sfx.start()
    ga('send', 'event', 'game', 'start');

    game.world.setBounds(0, 0, game.width * NUMBER_OF_PAGES, game.height);

    @pages = []
    _.times NUMBER_OF_PAGES, (idx) =>
      @pages.push new App.Views.Page(game, game.width * (idx+1), 0)

    game.stage.backgroundColor = 0xDDDDDD

  update: ->
    for page in @pages
      page.update()
    game.camera.x += @camera_speed;
