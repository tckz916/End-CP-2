var playerArray = new Array();
match.on('end', function() {

// killrank
  var players = match.getPlayers();
  for (var i = 0; i < players.length; i++) {
    if (players[i].getTeam() == null) {
      continue;
    }
    var player = players[i];
    playerArray.push({
      name: player.getName(),
      kills: player.getKills()
    });
    player.playSound("LEVEL_UP", 1, 1);
  }

  sort(playerArray, "kills", "DESC");
  for (var i = 0; i < 5; i++) {
    if (playerArray[i] != null) {
      var rank = i + 1;
      var code = 6 - i;
      match.broadcast("`" + code + "`l" + getRank(rank) + " `r[ `2" + playerArray[i]["name"] + "`r: `d`l" + playerArray[i]["kills"] + " kills `r]");
    }
  }

// stats
  for (var i = 0; i < players.length; i++) {
    if (players[i].getTeam() == null) {
      continue;
    }
    var player = players[i];

    var kill = player.getKills();
    var death = player.getDeaths();

    var jp_message = '`a----- `6試合統計 `a-----\n`aKills: `6' + kill + ' `aDeaths: `6' + death;
    var message = '`a----- `6This game stats `a-----\n`aKills: `6' + kill + ' `aDeaths: `6' + death;
    if (player.getLocale() == 'ja_JP') {
        player.sendMessage(jp_message);
    } else {
        player.sendMessage(message);
    }
    player.playSound("LEVEL_UP", 1, 1);
  }
});

function getRank(rank) {
    var no = (rank + '').substr(-1);
    if (no == '1') {
       return rank + 'st'
    } else if (no == '2') {
       return rank + 'nd';
    } else if (no == '3') {
       return rank + 'rd';
    } else {
       return rank + 'th';
    }
}

function sort(ary, key, order) {
  var reverse = 1;
  if (order && order.toLowerCase() == "desc")
    reverse = -1;
  ary.sort(
    function(a, b) {
      if (a[key] < b[key])
        return -1 * reverse;
      else if (a[key] == b[key])
        return 0;
      else
        return 1 * reverse;
    });
}
