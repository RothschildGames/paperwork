class App.Help

  didSeeOnce: false

  preload: ->
    game.stage.backgroundColor = 0xDDDDDD
    @page = new App.Views.Page(game, 0, 0, {signatures: 0})
    @page.text.text = """

      GAME AGREEMENT

      THIS GAME AGREEMENT (this “game”) made and entered into and made effective this ____ day of _____________, 2015, by and between Rothschild Games., a game company (hereinafter referred to as “Owner”) and PLAYER, L.L.C., a limited liability company, (hereinafter referred to as “Tenant”).
      WHEREAS, Owner and Tenant desire to enter into a GAME Agreement and memorialize the terms of the lease between Owner and Tenant.

      GAME RULES

      In PAPERWORK (this "game") your job as decribed by appendix A/13 is to KEEP SIGNING DOCUMENTS as they pass your screen.

      The amount of papers you sign will directly influence your score compensation based on the common formula in section 7 of the Ludum Law


      Sign here to start:

      """
    @addSignature()

  addSignature: =>
    @signature = new App.Views.Signature(game, 400, 860, @page.color)
    @signature.on "signed", =>
      started = @startGame()

  onReady: =>
    @addSignature()

  startGame: =>
    @state.start('game')

  update: ->
    @signature?.update()
