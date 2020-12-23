import {URL_SUPERMATH_AUDIOS} from './../halpers/urls';

// list of mp3 on server side
const AUDIO_FILES = [
    'bumer.mp3',
    'seven_nation_army.mp3',
    'show_must_go_on.mp3',
    'we_will_rock_you.mp3',
    'zombie.mp3',
];

export function get_rnd_adio_url() {
    var file = AUDIO_FILES[AUDIO_FILES.length * Math.random() | 0];
    return URL_SUPERMATH_AUDIOS + file;
}
