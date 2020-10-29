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
import navy10 from './../../images/tasks/navi_10.jpg';

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

import task1 from './../../images/levels/task_1.jpg';
import task2 from './../../images/levels/task_2.jpg';
import task3 from './../../images/levels/task_3.jpg';
import task4 from './../../images/levels/task_4.jpg';
import task5 from './../../images/levels/task_5.jpg';
import task6 from './../../images/levels/task_6.jpg';
import task7 from './../../images/levels/task_7.jpg';
import task8 from './../../images/levels/task_8.jpg';
import task9 from './../../images/levels/task_9.jpg';

import test_img from './../../images/tasks/test_img.jpg';

const task_amount = 5; // 30;

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
    // white7 is repeated 3 time to make test more complex
    {id: 10, uid: 'whiteT', logo: test_img, type: 'test', task: 'white1,white2,white5,white6,white7,white8,white7,white9,white7', amount: task_amount},
];

export const orange_games = [
    // id1 starts from 12 due to: 13-12-11-10, if less it will be 10-9-8-7
    {id: 1, uid: 'orange1', time: 0, logo: orange1, type: 'linedigits', task: '13-97', amount: task_amount},
    {id: 2, uid: 'orange2', time: 0, logo: orange2, type: 'comp_nums', task: '<>=,11-99,1', amount: task_amount},
    {id: 3, uid: 'orange3', time: 0, logo: orange3, type: '2digits', task: '+-,1-9,10-20,1,1', amount: task_amount},
    {id: 4, uid: 'orange4', time: 0, logo: orange4, type: '2digits', task: '+-,1-9,1-9,10,10', amount: task_amount},
    {id: 5, uid: 'orange5', time: 0, logo: orange5, type: '2digits', task: '+-,1-9,1-9,10,1', amount: task_amount},
    {id: 6, uid: 'orange6', time: 0, logo: orange6, type: '2digits', task: '+-,1-9,11-99,1,1', amount: task_amount},
    {id: 7, uid: 'orange7', time: 0, logo: orange7, type: '2digits', task: '+-,1-9,11-99,10,1', amount: task_amount},
    {id: 8, uid: 'orange8', time: 0, logo: orange8, type: '2digits', task: '+-,11-99,11-99,1,1', amount: task_amount},
    {id: 9, uid: 'orange9', time: 0, logo: orange9, type: '2digit_arg', task: 'd,+-,11-99,11-99,1,1', amount: task_amount},
    {id: 10, uid: 'orange10', time: 0, logo: orange10, type: '2digits', task: '+-,11-99,1-1,1,100', amount: task_amount},
    {id: 11, uid: 'orangeT', time: 10, logo: test_img, type: 'test', task: 'orange1,orange2,orange4,orange5,orange6,orange7,orange8,orange9,orange10', amount: task_amount},
];

export const green_games = [
    {id: 1, uid: 'green1', time: 0, logo: green1, type: 'comp_expr', task: '<>=,+-,1-9,10', amount: task_amount},
    {id: 2, uid: 'green2', time: 0, logo: green2, type: 'comp_expr', task: '<>=,+-,11-99,1', amount: task_amount},
    {id: 3, uid: 'green3', time: 0, logo: green3, type: '2digits', task: '+-,1-9,1-9,100,100', amount: task_amount},
    {id: 4, uid: 'green4', time: 0, logo: green4, type: '2digits', task: '+-,1-9,1-9,10,100', amount: task_amount},
    {id: 5, uid: 'green5', time: 0, logo: green5, type: '2digits', task: '+-,1-99,1-99,10,10', amount: task_amount},
    {id: 6, uid: 'green6', time: 0, logo: green6, type: '2digits', task: '+-,1-9,101-999,1,1', amount: task_amount},
    {id: 7, uid: 'green7', time: 0, logo: green7, type: 'line_3numbers', task: '+-,1-99,1', amount: task_amount},
    {id: 8, uid: 'green8', time: 0, logo: green8, type: 'digit_2column', task: '+-,11-99,101-999,1,1', amount: task_amount},
    {id: 9, uid: 'green9', time: 0, logo: green9, type: 'digit_2column', task: '+-,1001-9999,1001-9999,1,1', amount: task_amount},
    {id: 10, uid: 'greenT', time: 10, logo: test_img, type: 'test', task: 'green2,green5,green6,green7,green8,green9', amount: task_amount},
];

export const navy_games = [
    {id: 1, uid: 'navy1', time: 0, logo: navy1, type: '2digits', task: 'x,0-5,0-5,1,1', amount: task_amount},
    {id: 2, uid: 'navy2', time: 0, logo: navy2, type: '2digits', task: 'x,1-10,1-10,1,1', amount: task_amount},
    // exclude multiplacation to ZERO (o) due to issue with many possible options, like 0x1=0, 0x2=0 etc.
    {id: 3, uid: 'navy3', time: 0, logo: navy3, type: '2digit_arg', task: 'd,x,1-10,1-10,1,1', amount: task_amount},
    {id: 4, uid: 'navy4', time: 0, logo: navy4, type: '2digits', task: ':,1-10,1-10,1,1', amount: task_amount},
    {id: 5, uid: 'navy5', time: 0, logo: navy5, type: '2digits', task: ':,11-99,2-9,1,1', amount: task_amount},
    {id: 6, uid: 'navy6', time: 0, logo: navy6, type: '3digits', task: 'x:,1-10,1', amount: task_amount},
    {id: 7, uid: 'navy7', time: 0, logo: navy7, type: '2digits', task: 'x,11-20,11-20,1,1', amount: task_amount},
    {id: 8, uid: 'navy8', time: 0, logo: navy8, type: '3digits', task: 'x,1-10,1', amount: task_amount},
    {id: 9, uid: 'navy9', time: 0, logo: navy9, type: 'line_5numbers', task: '+-x,5,0-10,1', amount: task_amount},
    {id: 10, uid: 'navy10', time: 0, logo: navy10, type: 'line_2numbers_signed', task: '+-,-100-100,-100-100,1,1', amount: task_amount},
    {id: 11, uid: 'navyT', time: 10, logo: test_img, type: 'test', task: 'navy2,navy3,navy4,navy5,navy6,navy7,navy8,navy9', amount: task_amount},
];

export const brown_games = [
    {id: 1, uid: 'brown1', time: 0, logo: brown1, type: '2digits_fr', task: '+,1-99,1-10,0,1', amount: task_amount},
    {id: 2, uid: 'brown2', time: 0, logo: brown2, type: '2digits_fr', task: '+-,1-99,1-99,1,1', amount: task_amount},
    {id: 3, uid: 'brown3', time: 0, logo: brown3, type: '2digits_fr', task: '+-,1-99,1-99,2,1', amount: task_amount},
    {id: 4, uid: 'brown4', time: 0, logo: brown4, type: 'line_2numbers_fr', task: '+-,1-99,1-99,3,3', amount: task_amount},
    {id: 5, uid: 'brown5', time: 0, logo: brown5, type: '2digits_fr', task: 'x,1-10,1-10,0,1', amount: task_amount},
    {id: 6, uid: 'brown6', time: 0, logo: brown6, type: '2digits_fr', task: 'x,1-10,1-10,1,1', amount: task_amount},
    {id: 7, uid: 'brown7', time: 0, logo: brown7, type: 'digit_3column', task: '+-,100-999,1', amount: task_amount},
    {id: 8, uid: 'brown8', time: 0, logo: brown8, type: 'line_4numbers', task: '+-,1-999,1', amount: task_amount},
    {id: 9, uid: 'brown9', time: 0, logo: brown9, type: 'digit_2column', task: 'x,10-999,10-999,1,1', amount: task_amount},
    {id: 10, uid: 'brownT', time: 10, logo: test_img, type: 'test', task: 'brown3,brown4,brown5,brown6,brown7,brown8,brown9', amount: task_amount},
];

export const black_games = [
    {id: 1, uid: 'black1', time: 0, logo: black1, type: 'digit_2column', task: '+-,100000-999999,100000-999999,1,1', amount: task_amount},
    {id: 2, uid: 'black2', time: 0, logo: black2, type: 'digit_2column', task: '+-,1000000-99999999,1000000-99999999,1,1', amount: task_amount},
    {id: 3, uid: 'black3', time: 0, logo: black3, type: 'digit_2column', task: 'x,100-999,100-999,1,1', amount: task_amount},
    {id: 4, uid: 'black4', time: 0, logo: black4, type: 'digit_2column', task: 'x,1000-9999,1000-9999,1,1', amount: task_amount},
    {id: 5, uid: 'black5', time: 0, logo: black5, type: 'digit_3column', task: '+-,101-99999,1', amount: task_amount},
    {id: 6, uid: 'black6', time: 0, logo: black6, type: '2digits', task: ':,101-999,11-999,1,1', amount: task_amount},
    {id: 7, uid: 'black7', time: 0, logo: black7, type: 'line_2numbers_fr', task: '+-,11-999,11-999,4,4', amount: task_amount},
    {id: 8, uid: 'black8', time: 0, logo: black8, type: 'line_3numbers', task: 'x:,101-999,1', amount: task_amount},
    {id: 9, uid: 'black9', time: 0, logo: black9, type: 'line_2numbers_signed', task: '+-,-99999-99999,-99999-99999,1,1', amount: task_amount},
    {id: 10, uid: 'blackT', time: 20, logo: test_img, type: 'test', task: 'black2,black4,black5,black6,black7,black8,black9', amount: task_amount},
];

export const task_games = [
    {id: 1, uid: 'task_1', time: 0, logo: task1, type: 'task', color: '#9900ff', level: 'beginner', locked: false},
    {id: 2, uid: 'task_2', time: 0, logo: task2, type: 'task', color: '#0000cc', level: 'elementary', locked: false},
    {id: 3, uid: 'task_3', time: 0, logo: task3, type: 'task', color: '#336699', level: 'intermediate', locked: true},
    {id: 4, uid: 'task_4', time: 0, logo: task4, type: 'task', color: '#00b3b3', level: 'upper intermediate', locked: true},
    {id: 5, uid: 'task_5', time: 0, logo: task5, type: 'task', color: '#808000', level: 'pre-advanced', locked: true},
    {id: 6, uid: 'task_6', time: 0, logo: task6, type: 'task', color: '#006600', level: 'advanced', locked: true},
    {id: 7, uid: 'task_7', time: 0, logo: task7, type: 'task', color: '#ff9933', level: 'proficient', locked: true},
    {id: 8, uid: 'task_8', time: 0, logo: task8, type: 'task', color: '#993300', level: 'expert', locked: true},
    {id: 9, uid: 'task_9', time: 0, logo: task9, type: 'task', color: '#800000', level: 'mastery', locked: true},
];

/**
 * {'type': type, 'task': task}
 * this.props.task, this.props.uid
 * white1,white2,white5,white6,white7,white8,white7,white9,white7, this.props.uid undefined
 */
export function get_random_task_for_test(tasks, escaped_task='') {
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
            // console.log('type ' + games[i].type + ', task ' + games[i].task + ', uid ' + rnd_task);
            return {'type': games[i].type, 'task': games[i].task, 'uid': rnd_task};
        }
    }

    console.log('CRITICAL ERROR: get_random_task_for_test returned wrong parameters');
}

export const color_belts = [
    {id: 'white', bckgrnd: '#e6e6e6', games: white_games, font: 'black', short_name: 'wht',},
    {id: 'orange', bckgrnd: '#ffb84d', games: orange_games, font: 'orange', short_name: 'orn',},
    {id: 'green', bckgrnd: '#8cff66', games: green_games, font: 'green', short_name: 'grn',},
    {id: 'navy', bckgrnd: '#99ccff', games: navy_games, font: 'navy', short_name: 'nav',},
    {id: 'brown', bckgrnd: '#cc6600', games: brown_games, font: 'brown', short_name: 'brn',},
    {id: 'black', bckgrnd: '#404040', games: black_games, font: 'black', short_name: 'blk',},
    {id: 'tasks', bckgrnd: '#3d0066', games: task_games, font: '#6600cc', short_name: 'tsk',},
];

export function get_belt_by_color(color) {
    if (color === 'orange') {
        return color_belts[1];
    } else if (color === 'green') {
        return color_belts[2];
    } else if (color === 'navy') {
        return color_belts[3];
    } else if (color === 'brown') {
        return color_belts[4];
    } else if (color === 'black') {
        return color_belts[5];
    } else if (color === 'tasks') {
        return color_belts[6];
    }
    return color_belts[0];
}
