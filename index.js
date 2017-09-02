'use strict';

import plyr from 'plyr';
import Choices from 'choices.js';
import fade from 'fade';
import stations from './stations.json';

import './style.styl';

let $app = document.body;

let $player = plyr.setup('.radio-player', {
  controls: [ 'play', 'mute', 'volume' ],
  keyboardShortcuts: { focused: true, global: true }
})[0];

let path = getPath(window.location);
let selectedStation = findStation(stations, path);
selectedStation.selected = true;

let $picker = new Choices('.station-selector', { choices: stations });
setStation($player, $picker.passedElement.value);

fade.in($app);

$picker.passedElement.addEventListener('change', e => {
  setStation($player, e.target.value);
  $player.stop();
});

function setStation(player, src) {
  player.source({ type: 'audio', sources: [{ src }] });
}

function getPath(location=window.location) {
  return location.pathname.replace(/^\//, '');
}

function findStation(stations, path='') {
  return stations.find(it => {
    if (!it.path) return false;
    return equals(it.path, path);
  }) || stations[0];
}

function equals(str1, str2) {
  return str1.trim().toLowerCase() === str2.trim().toLowerCase();
}
