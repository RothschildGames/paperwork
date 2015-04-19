class App.Game

  CAMERA_SPEED = 3

  create_page = ->
    page = game.add.graphics(0, 0);
    page.beginFill(0xFFFFFF, 1);
    page.drawRect(margin, margin, game.width - (margin * 2), game.height - (margin * 2))
    return page

  preload: ->


  create: ->
    ga('send', 'event', 'game', 'start');
    game.world.setBounds(0, 0, game.width * 10, game.height);

    page1 = new App.Views.Page(game, game.width, 0)
    page1 = new App.Views.Page(game, game.width * 2, 0)
#    page1 = create_page()
#    page2 = create_page()
#    page2.x = game.width - margin
#    bg = game.add.sprite(0, 0, 'background')
    game.backgroundColor = 0xF0F

  update: ->
    game.camera.x += CAMERA_SPEED;
