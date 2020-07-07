import white1 from './../../images/tasks/white_1.jpg';
import white2 from './../../images/tasks/white_2.jpg';
import white3 from './../../images/tasks/white_3.jpg';
import white4 from './../../images/tasks/white_4.jpg';
import white5 from './../../images/tasks/white_5.jpg';
import white6 from './../../images/tasks/white_6.jpg';
import white7 from './../../images/tasks/white_7.jpg';
import white8 from './../../images/tasks/white_8.jpg';
import white9 from './../../images/tasks/white_9.jpg';

import orange1 from './../../images/tasks/orange_1.jpg';
import orange2 from './../../images/tasks/orange_2.jpg';
import orange3 from './../../images/tasks/orange_3.jpg';
import orange4 from './../../images/tasks/orange_4.jpg';
import orange5 from './../../images/tasks/orange_5.jpg';
import orange6 from './../../images/tasks/orange_6.jpg';
import orange7 from './../../images/tasks/orange_7.jpg';
import orange8 from './../../images/tasks/orange_8.jpg';
import orange9 from './../../images/tasks/orange_9.jpg';
import orange10 from './../../images/tasks/orange_10.jpg';

import green1 from './../../images/tasks/green_1.jpg';
import green2 from './../../images/tasks/green_2.jpg';
import green3 from './../../images/tasks/green_3.jpg';
import green4 from './../../images/tasks/green_4.jpg';
import green5 from './../../images/tasks/green_5.jpg';
import green6 from './../../images/tasks/green_6.jpg';
import green7 from './../../images/tasks/green_7.jpg';
import green8 from './../../images/tasks/green_8.jpg';
import green9 from './../../images/tasks/green_9.jpg';

import navy1 from './../../images/tasks/navi_1.jpg';
import navy2 from './../../images/tasks/navi_2.jpg';
import navy3 from './../../images/tasks/navi_3.jpg';
import navy4 from './../../images/tasks/navi_4.jpg';
import navy5 from './../../images/tasks/navi_5.jpg';
import navy6 from './../../images/tasks/navi_6.jpg';
import navy7 from './../../images/tasks/navi_7.jpg';
import navy8 from './../../images/tasks/navi_8.jpg';
import navy9 from './../../images/tasks/navi_9.jpg';

import brown1 from './../../images/tasks/brown_1.jpg';
import brown2 from './../../images/tasks/brown_2.jpg';
import brown3 from './../../images/tasks/brown_3.jpg';
import brown4 from './../../images/tasks/brown_4.jpg';
import brown5 from './../../images/tasks/brown_5.jpg';
import brown6 from './../../images/tasks/brown_6.jpg';
import brown7 from './../../images/tasks/brown_7.jpg';
import brown8 from './../../images/tasks/brown_8.jpg';
import brown9 from './../../images/tasks/brown_9.jpg';

import black1 from './../../images/tasks/black_1.jpg';
import black2 from './../../images/tasks/black_2.jpg';
import black3 from './../../images/tasks/black_3.jpg';
import black4 from './../../images/tasks/black_4.jpg';
import black5 from './../../images/tasks/black_5.jpg';
import black6 from './../../images/tasks/black_6.jpg';
import black7 from './../../images/tasks/black_7.jpg';
import black8 from './../../images/tasks/black_8.jpg';
import black9 from './../../images/tasks/black_9.jpg';

const task_amount = 30;

export const white_games = [
    {id: 1, uid: 'white1', logo: white1, type: 'linedigits', task: '0-7', amount: task_amount},
    {id: 2, uid: 'white2', logo: white2, type: 'comp_nums', task: '<>=,0-10,1', amount: task_amount},
    {id: 3, uid: 'white3', logo: white3, type: '2digits', task: '+,0-10,0-10,1,1', amount: task_amount},
    {id: 4, uid: 'white4', logo: white4, type: '2digits', task: '-,0-10,0-10,1,1', amount: task_amount},
    {id: 5, uid: 'white5', logo: white5, type: '2digits', task: '+-,0-10,0-10,1,1', amount: task_amount},
    {id: 6, uid: 'white6', logo: white6, type: '2digit_arg', task: 'o,+-,1-10,1-10,1,1', amount: task_amount},
    {id: 7, uid: 'white7', logo: white7, type: '3digits', task: '+-,1-10,1', amount: task_amount},
    {id: 8, uid: 'white8', logo: white8, type: 'comp_expr', task: '<>=,+-,0-10,1', amount: task_amount},
    {id: 9, uid: 'white9', logo: white9, type: '2digit_arg', task: 'd,+-,0-10,0-10,1,1', amount: task_amount},
    {id: 10, uid: 'whiteT', logo: 'none', type: 'test', task: 'white1,white2,white3,white4,white5,white6,white7,white8,white9', amount: task_amount},
];

export const orange_games = [
    // id1 starts from 12 due to: 13-12-11-10, if less it will be 10-9-8-7
    {id: 1, uid: 'orange1', logo: orange1, type: 'linedigits', task: '13-97', amount: task_amount},
    {id: 2, uid: 'orange2', logo: orange2, type: 'comp_nums', task: '<>=,11-99,1', amount: task_amount},
    {id: 3, uid: 'orange3', logo: orange3, type: '2digits', task: '+-,1-9,10-20,1,1', amount: task_amount},
    {id: 4, uid: 'orange4', logo: orange4, type: '2digits', task: '+-,1-9,1-9,10,10', amount: task_amount},
    {id: 5, uid: 'orange5', logo: orange5, type: '2digits', task: '+-,1-10,1-9,10,1', amount: task_amount},
    {id: 6, uid: 'orange6', logo: orange6, type: '2digits', task: '+-,1-9,11-99,1,1', amount: task_amount},
    {id: 7, uid: 'orange7', logo: orange7, type: '2digits', task: '+-,1-9,11-99,10,1', amount: task_amount},
    {id: 8, uid: 'orange8', logo: orange8, type: '2digits', task: '+-,11-99,11-99,1,1', amount: task_amount},
    {id: 9, uid: 'orange9', logo: orange9, type: '2digit_arg', task: 'd,+-,11-99,11-99,1,1', amount: task_amount},
    {id: 10, uid: 'orange10', logo: orange10, type: '2digits', task: '+-,11-99,1-1,1,100', amount: task_amount},
    {id: 11, uid: 'orangeT', logo: 'none', type: 'test', task: 'orange1,orange2,orange3,orange4,orange5,orange6,orange7,orange8,orange9,orange10', amount: task_amount},
];

export const green_games = [
    {id: 1, uid: 'green1', logo: green1, type: 'comp_expr', task: '<>=,+-,1-9,10', amount: task_amount},
    {id: 2, uid: 'green2', logo: green2, type: 'comp_expr', task: '<>=,+-,11-99,1', amount: task_amount},
    {id: 3, uid: 'green3', logo: green3, type: '2digits', task: '+-,1-9,1-9,100,100', amount: task_amount},
    {id: 4, uid: 'green4', logo: green4, type: '2digits', task: '+-,1-9,1-9,10,100', amount: task_amount},
    {id: 5, uid: 'green5', logo: green5, type: '2digits', task: '+-,1-99,1-99,10,10', amount: task_amount},
    {id: 6, uid: 'green6', logo: green6, type: '2digits', task: '+-,1-9,101-999,1,1', amount: task_amount},
    {id: 7, uid: 'green7', logo: green7, type: '2digits', task: '+-,1-9,101-999,1,1', amount: task_amount},
    {id: 8, uid: 'green8', logo: green8, type: 'digit_2column', task: '+-,11-99,101-999,1,1', amount: task_amount},
    {id: 9, uid: 'green9', logo: green9, type: 'digit_2column', task: '+-,1001-9999,1001-9999,1,1', amount: task_amount},
    {id: 10, uid: 'greenT', logo: 'none', type: 'test', task: 'green2,green5,green6,green7,green8,green9', amount: task_amount},
];

export const navy_games = [
    {id: 1, uid: 'navy1', logo: navy1, type: '2digits', task: 'x,0-5,0-5,1,1', amount: task_amount},
    {id: 2, uid: 'navy2', logo: navy2, type: '2digits', task: 'x,1-10,1-10,1,1', amount: task_amount},
    // exclude multiplacation to ZERO (o) due to issue with many possible options, like 0x1=0, 0x2=0 etc.
    {id: 3, uid: 'navy3', logo: navy3, type: '2digit_arg', task: 'd,x,1-10,1-10,1,1', amount: task_amount},
    {id: 4, uid: 'navy4', logo: navy4, type: '2digits', task: ':,1-10,1-10,1,1', amount: task_amount},
    {id: 5, uid: 'navy5', logo: navy5, type: '2digits', task: ':,11-99,2-9,1,1', amount: task_amount},
    {id: 6, uid: 'navy6', logo: navy6, type: '3digits', task: 'x:,1-10,1', amount: task_amount},
    {id: 7, uid: 'navy7', logo: navy7, type: '2digits', task: 'x,11-20,11-20,1,1', amount: task_amount},
    {id: 8, uid: 'navy8', logo: navy8, type: '3digits', task: 'x,1-10,1', amount: task_amount},
    {id: 9, uid: 'navy9', logo: navy9, type: 'line_5numbers', task: '+-x,5,0-10,1', amount: task_amount},
    {id: 10, uid: 'navyT', logo: 'none', type: 'test', task: 'navy2,navy3,navy4,navy5,navy6,navy7,navy8,navy9', amount: task_amount},
];

export const brown_games = [
    {id: 1, uid: 'brown1', logo: brown1, type: '2digits_fr', task: '+,1-99,1-10,0,1', amount: task_amount},
    {id: 2, uid: 'brown2', logo: brown2, type: '2digits_fr', task: '+-,1-99,1-99,1,1', amount: task_amount},
    {id: 3, uid: 'brown3', logo: brown3, type: '2digits_fr', task: '+-,1-99,1-99,2,1', amount: task_amount},
    {id: 4, uid: 'brown4', logo: brown4, type: 'line_2numbers_fr', task: '+-,1-99,1-99,3,3', amount: task_amount},
    {id: 5, uid: 'brown5', logo: brown5, type: '2digits_fr', task: 'x,1-10,1-10,0,1', amount: task_amount},
    {id: 6, uid: 'brown6', logo: brown6, type: '2digits_fr', task: 'x,1-10,1-10,1,1', amount: task_amount},
    {id: 7, uid: 'brown7', logo: brown7, type: 'digit_3column', task: '+-,100-999,1', amount: task_amount},
    {id: 8, uid: 'brown8', logo: brown8, type: 'line_4numbers', task: '+-,1-999,1', amount: task_amount},
    {id: 9, uid: 'brown9', logo: brown9, type: 'digit_2column', task: 'x,10-999,10-999,1,1', amount: task_amount},
    {id: 10, uid: 'brownT', logo: 'none', type: 'test', task: 'brown3,brown4,brown5,brown6,brown7,brown8,brown9', amount: task_amount},
];

export const black_games = [
    {id: 1, uid: 'black1', logo: black1, type: 'digit_2column', task: '+-,100000-999999,100000-999999,1,1', amount: task_amount},
    {id: 2, uid: 'black2', logo: black2, type: 'digit_2column', task: '+-,1000000-99999999,1000000-99999999,1,1', amount: task_amount},
    {id: 3, uid: 'black3', logo: black3, type: 'digit_2column', task: 'x,100-999,100-999,1,1', amount: task_amount},
    {id: 4, uid: 'black4', logo: black4, type: 'digit_2column', task: 'x,1000-9999,1000-9999,1,1', amount: task_amount},
    {id: 5, uid: 'black5', logo: black5, type: 'digit_3column', task: '+-,101-99999,1', amount: task_amount},
    {id: 6, uid: 'black6', logo: black6, type: '2digits', task: ':,101-999,11-999,1,1', amount: task_amount},
    {id: 7, uid: 'black7', logo: black7, type: 'line_2numbers_fr', task: '+-,11-999,11-999,4,4', amount: task_amount},
    {id: 8, uid: 'black8', logo: black8, type: 'line_3numbers', task: 'x:,101-999,1', amount: task_amount},
    {id: 9, uid: 'black9', logo: black9, type: 'line_2numbers_signed', task: '+-,-99999-99999,-99999-99999,1,1', amount: task_amount},
    {id: 10, uid: 'blackT', logo: 'none', type: 'test', task: 'black2,black4,black5,black6,black7,black8,black9', amount: task_amount},
];

/**
 * {'type': type, 'task': task}
 */
export function get_random_taks_for_test(tasks, escaped_task) {
    var rnd_task, array = tasks.split(',');
    while (true) {
        rnd_task = array[Math.floor(Math.random() * (array.length))];
        if (rnd_task !== escaped_task) {
            break;
        }
    }

    var games = white_games;
    if (rnd_task.indexOf('orange') !== -1) {
        games = orange_games;
    } else if (rnd_task.indexOf('green') !== -1) {
        games = green_games;
    } else if (rnd_task.indexOf('navy') !== -1) {
        games = navy_games;
    } else if (rnd_task.indexOf('brown') !== -1) {
        games = brown_games;
    } else if (rnd_task.indexOf('black') !== -1) {
        games = black_games;
    }

    for (var i = 0; i < games.length; i++) {
        if (games[i].uid === rnd_task) {
            return {'type': games[i].type, 'task': games[i].task, 'uid': rnd_task};
        }
    }
}
