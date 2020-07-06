/** @const {string} */
var OPERATION_SUM = '+';
/** @const {string} */
var OPERATION_SUB = '-';
/** @const {string} */
var OPERATION_MUL = 'x';
/** @const {string} */
var OPERATION_DIV = ':';

/**
 * Task generation from type and settings
 */
export function generate_task(type, settings) {
    // console.log('generate_task ' + type + ', settings ' + settings);
    var array = settings.split(',');

    // depends from type, result may have different properties
    var task, result = {};

    // 2 numbers task, like: 1 + 2 = 3
    if (type === '2digits') {
        task = generate_2digit_task(array[0], array[1], array[2], array[3], array[4]);
        result = {'expr1': task.num1 + ' ' + task.operation + ' ' + task.num2 + ' = ', 'result': task.result};
        console.log(type + ' generate_task: ' + result.expr1 + '' + result.result);

    } else if (type === 'line_2numbers_signed') {
        task = generate_2digit_task_signed(array[0], array[1], array[2], array[3], array[4]);
        result = {'expr1': task.num1 + ' ' + task.operation + ' ' + task.num2 + ' = ', 'result': task.result};
        console.log(type + ' line_2numbers_signed: ' + result.expr1 + '' + result.result);

    } else if ((type === '2digits_fr') || (type === 'line_2numbers_fr')) {
        task = generate_2digit_fractional_task(array[0], array[1], array[2], array[3], array[4]);
        result = {'expr1': task.num1 + ' ' + task.operation + ' ' + task.num2 + ' = ', 'result': task.result};
        console.log(type + ' generate_task: ' + result.expr1 + '' + result.result);

    // 3 numbers task: 1 + 2 + 3 = 6
    } else if ((type === '3digits') || (type === 'line_3numbers')) {
        // operations, range_numbers, factor
        if (array[0] === '+-') { // plus and minus
            result = generate_3digit_task(array[0], array[1], array[2]);

        // multiplications only: 3x2x9
        } else if (array[0] === 'x') {
            result = generate_3digit_mul_task();

        // division and multiplication: x:
        } else {
            // x:,101-999,1
            result = generate_3digit_div_task(array[1]);
        }
        console.log(type + ' generate_task: ' + result.expr1 + result.result);

    // math operation determination tasks 1 ? 2 = 3
    // argument operation determination tasks 7 + ? = 9 or ? - 6 = 2
    } else if (type === '2digit_arg') {
        task = generate_2digit_task(array[1], array[2], array[3], array[4], array[5]);
        var expected = task.num1, argument = '1'; 
        if (array[0] === 'd') {
            if (Math.random() >= 0.5) {
                argument = '2'; expected = task.num2;
            }
        } else {
            argument = 'o'; expected = task.operation;
        }

        result = {'num1': task.num1, 'num2': task.num2, 'operation': task.operation,
                  'outcome': task.result, 'result': expected, 'argument': argument};

        console.log(type + ' generate_task: ' + result.num1 + result.operation + result.num2 + '=' + result.result);

    // {'num1': number_1, 'num2': number_2, 'operation': operation, 'result': result};
    } else if (type === 'digit_2column') {
        result = generate_2digit_task(array[0], array[1], array[2], array[3], array[4]);
        console.log(type + ' generate_task: ' + result.num1 + result.operation + result.num2 + '=' + result.result);

    // +-,10-999,1
    } else if (type === 'digit_3column') {
        // operations, range_numbers, factor
        result = generate_3digit_task(array[0], array[1], array[2], 'column');
        console.log(type + ' generate_task: ' + result.num1 + result.operation1 + result.num2 + result.operation2 + result.num3 + '=' + result.result);

    // sequence digits like, 1,2,3,4 or 8,7,6,5 etc.
    } else if (type === 'linedigits') {
        result = generate_sequence_task(settings);
        console.log(type + ' generate_task: ' + result.expr1 + result.result);

    // comparision digits, 5 < 6
    } else if (type === 'comp_nums') {
        // <>=,0-10,1 -> operations, range, factor
        result = generate_comparison_digits(array[0], array[1], parseInt(array[2]));
        console.log(type + ' generate_task: ' + result.expr1 + result.result + result.expr2);

    // comparision expressions, 2+3 vs 9-3 (<>=)
    } else if (type === 'comp_expr') {
        // <>=,+-,0-10,1 -> operations, range_1, range_2, factor_1, factor_2
        result = generate_comparison_expressions(array[1], array[2], array[2], parseInt(array[3]), parseInt(array[3]));
        console.log(type + ' generate_task: ' + result.expr1 + result.result + result.expr2);

    } else if (type === 'line_4numbers') {
        // input string: '+-*,5,0-10,1' -> (0)operations: +-*, (1)#numbers: 5, (2)range: 0-10, (3)factor: 1
        // operations, range_numbers, factor
        result = generate_4digit_task(array[0], array[1], array[2]);
        console.log(type + ' generate_task: ' + result.expr1 + result.result);

    } else if (type === 'line_5numbers') {
        // input string: '+-x,5,0-10,1' -> (0)operations: +-x, (1)#numbers: 5, (2)range: 0-10, (3)factor: 1
        // operations, range_numbers, factor
        result = generate_5digit_task(array[0], array[2], array[3]);
        console.log(type + ' generate_task: ' + result.expr1 + result.result);

    // undefined tasks, will return error
    } else {
        result = 'generate_task: wrong type "' + type + '" or task: "' + settings + '"';
        console.log(type + ' generate_task: ' + result);
    }

    return result;
}

function generate_3digit_mul_task() {
    var num1 = parseInt(get_random_int('4-9'));
    var num2 = parseInt(get_random_int('6-9'));
    var num3 = parseInt(get_random_int('3-9'));

    var expression = '', result = 0;
    // below statments just for ordering
    if (Math.random() < 0.3) {
        expression = num1.toString() + ' x ' + num2.toString() + ' x ' + num3.toString();
    } else if (Math.random() < 0.8) {
        expression = num1.toString() + ' x ' + num3.toString() + ' x ' + num2.toString();
    } else {
        expression = num3.toString()  + ' x ' +  num1.toString() + ' x ' + num2.toString();
    }
    result = num1*num2*num3;

    return {'expr1': expression + ' = ', 'result': result};
}

function generate_3digit_div_task(range) {
    var num1, num2;
    if (range === '1-10') {
        num1 = parseInt(get_random_int('4-9'));
        num2 = parseInt(get_random_int('6-9'));
    } else {
        num1 = parseInt(get_random_int(range));
        num2 = parseInt(get_random_int(range));
    }

    var num12 = num1 * num2;
    var num3 = parseInt(get_random_int('3-9'));
    var expression = '', result = 0;

    if (Math.random() >= 0.5) { // : first
        expression = num12.toString() + ' : ' + num2.toString() + ' x ' + num3.toString();
    } else { // * first
        expression = num3.toString()  + ' x ' +  num12.toString() + ' : ' + num2.toString();
    }
    result = num1*num3;

    return {'expr1': expression + ' = ', 'result': result};
}

/*
    usage:
        '0-10', '10-100', etc.
    result:
        '+-,0-10,1' -> ['+-', '0-10', '1']
*/
function generate_sequence_task(range) {
    var number = parseInt(get_random_int(range));
    var task, result;
    if (number > 3) {
        // randomNumber is true => goes down
        var randomNumber = Math.random() >= 0.5;
        if (randomNumber) {
            task = number.toString() + ' , ' + (number-1).toString() + ' , ' + (number-2).toString();
            result = (number-3).toString();
        } else {
            task = number.toString() + ' , ' + (number+1).toString() + ' , ' + (number+2).toString();
            result = (number+3).toString();
        }
    } else {
        task = number.toString() + ' , ' + (number+1).toString() + ' , ' + (number+2).toString();
        result = (number+3).toString();
    }
    return {'expr1': task + ' , ', 'result': result};
}

/*
    usage:
        '<>=,0-10,1'
    result:
        '<>=,0-10,1' -> ['<>=', '0-10', '1']
*/
function generate_comparison_digits(operations, range, factor) {
    var num1 = get_random_int(range) * factor;
    var num2 = get_random_int(range) * factor;

    var operation = '=';
    if (num1 > num2) { operation = '>'; }
    else if (num1 < num2) { operation = '<'; }

    return {'expr1': num1, 'expr2': num2, 'result': operation};
}

/*
 * usage: <>=,+-,0-10,1
 * 
 */
function generate_comparison_expressions(operations, range_1, range_2, factor_1, factor_2) {
    var task1 = generate_2digit_task(operations, range_1, range_2, factor_1, factor_2);
    var expr1 = task1.num1 + ' ' + task1.operation + ' ' + task1.num2;
    var task2 = generate_2digit_task(operations, range_1, range_2, factor_1, factor_2);
    var expr2 = task2.num1 + ' ' + task2.operation + ' ' + task2.num2;

    var operation = '', num1 = parseInt(task1.result), num2 = parseInt(task2.result);
    if (num1 > num2) { operation = '>'; }
    else if (num1 < num2) { operation = '<'; }
    else { operation = '='; }

    return {'expr1': expr1, 'expr2': expr2, 'result': operation};
}

function generate_4digit_task(operations, range, factor=1) {
    var num1 = parseInt(get_random_int('1-9'));
    var num2 = parseInt(get_random_int('11-99'));
    var num3 = parseInt(get_random_int('101-999'));
    var num4 = parseInt(get_random_int('1001-9999'));

    var result = num4, expression = '';
    var operation = get_random_operation(operations);
    if (operation === '+') {
        expression = num4.toString() + ' + ' + num3.toString();
        result = num3 + num4;
    } else { // else -
        expression = num4.toString() + ' - ' + num3.toString();
        result = num4 - num3;
    }

    operation = get_random_operation(operations);
    if (operation === '+') {
        expression = expression + ' + ' + num2.toString();
        result = result + num2;
    } else { // else -
        if (result > num2) {
            expression = expression + ' - ' + num2.toString();
            result -= num2;
        } else {
            expression = expression + ' + ' + num2.toString();
            result = result + num2;
        }
    }

    operation = get_random_operation(operations);
    if (operation === '+') {
        expression = expression + ' + ' + num1.toString();
        result = result + num1;
    } else { // else -
        if (result > num1) {
            expression = expression + ' - ' + num1.toString();
            result -= num1;
        } else {
            expression = expression + ' + ' + num1.toString();
            result = result + num1;
        }
    }

    var task = {'expr1': expression + ' = ', 'result': result.toString()};
    return task;
}

function generate_5digit_task(operations, range, factor=1) {
    var number, number_3, number_4, result12, result34, operation_2, operation_3, operation_4;

    var number_1 = parseInt(get_random_int('2-10'));
    var number_2 = parseInt(get_random_int('2-10'));
    var expression = number_1.toString() + ' x ' + number_2.toString();

    var result = number_1 * number_2;
    if (result < 10) {
        // lets make third multiplier as max as possible
        number = parseInt(get_random_int('6-10'));
        expression = expression + ' x ' + number.toString();
        operation_2 = '*'; result = result * number;
        // console.log('000 YURA*:: expression ' + expression + ', result ' + result + ', number ' + number);

    } else {
        operation_2 = get_random_operation(operations);
        if (operation_2 === '+') {
            number = parseInt(get_random_int('30-100'));
            result = result + number;
            if (Math.random() >= 0.5) {
                expression = number.toString() + ' + ' + expression; 
            } else {
                expression = expression + ' + ' + number.toString();
            }
            // console.log('111 YURA+:: expression ' + expression + ', result ' + result + ', number ' + number);

        } else if (operation_2 === '-') {
            number = parseInt(get_random_int('40-99'));
            if (result > number) {
                result = result - number;
                expression = expression + ' - ' + number.toString();
            } else {
                result = number - result;
                expression = number + ' - ' + expression;
            }
            // console.log('222 YURA-:: expression ' + expression + ', result ' + result + ', number ' + number);

        } else if (operation_2 === '*') {
            number_3 = parseInt(get_random_int('2-10'));
            number_4 = parseInt(get_random_int('2-10'));
            result34 = number_3 * number_4; result12 = result;
            var expr34 = number_3.toString() + ' x ' + number_4.toString();
            if (result34 < 10) {
                number = parseInt(get_random_int('6-10'));
                result34 = result34 * number;
                expr34 = expr34 + ' x ' + number.toString();
            }

            operation_3 = get_random_operation('+-');
            if (operation_3 === '+') {
                expression = expression + ' + ' + expr34;
                result = result + result34;
            } else { // else -
                if (result > result34) {
                    expression = expression + ' - ' + expr34;
                    result = result - result34;
                } else {
                    expression = expr34 + ' - ' + expression;
                    result = result34 - result;
                }
            }

            // console.log('333 YURA*:: expression ' + expression + ', result ' + result + ', operation_3: ' + operation_3 + ', expr34 ' + expr34);
        }
    }


    var number_N = parseInt(get_random_int('60-100'));
    // if operation_2 WAS multiplication -> no more multiplications
    if (operation_2 === '*') {
        // (8 x 9 - 6 x 6)
        operation_4 = get_random_operation('+-');
        if (operation_4 === '+') {
            if (Math.random() >= 0.5) {
                expression = number_N + ' + ' + expression; 
            } else {
                expression = expression + ' + ' + number_N; 
            }
            result = result + number_N;

        } else { // else -
            // if operation_3 WAS minus: number_N - (3*4 - 2*3)
            if (operation_3 === '-') {
                // re-calculate result due to -- = +
                var result14 = result12 + result34;
                if (number_N > result14) { // number_N > (3*4 - 2*3)
                    result = number_N - result14;
                    expression = number_N  + ' - ' + expression;
                } else { // if number_N < result
                    result = result + number_N;
                    expression = number_N + ' + ' + expression;
                }

            } else { // operation_3 WAS plus
                result = result + number_N;
                expression = expression + ' + ' + number_N;
            }
        }
    } else {
        operation_4 = get_random_operation(operations);
        if (operation_4 === '+') {
            if (Math.random() >= 0.5) {
                expression = number_N + ' + ' + expression; 
            } else {
                expression = expression + ' + ' + number_N;
            }
            result = result + number_N;
        } else if (operation_4 === '-') {
            // If operation_2 WAS minus: result = 85 - 9 x 3
            if (result > number_N) {
                result = result - number_N;
                expression = expression + ' - ' + number_N;
            } else { // result < number_N, 86
                result = result + number_N;
                expression = expression + ' + ' + number_N;
            }

        } else { // else *
            number_3 = parseInt(get_random_int('7-9'));
            number_4 = parseInt(get_random_int('7-9'));
            result34 = number_3 * number_4;

            operation_3 = get_random_operation('+-');
            if (operation_3 === '+') {
                if (Math.random() >= 0.5) {
                    expression = expression + ' + ' + number_3 + ' x ' + number_4;
                } else {
                    expression = number_3 + ' x ' + number_4 + ' + ' + expression;
                }
                result = result + result34;

            } else { // else -: (5 x 10 - 48) - ?
                // IF: 8 x 7 - 67 - 4 x 7 =
                if (operation_2 === '-') {
                    // result = number + number_1 * number_2;
                    if (result > result34) {
                        result = result - result34;
                        expression = expression + ' - ' + number_3 + ' x ' + number_4;
                    } else { // result < result34 -> replace operation on +
                        result = result + result34;
                        expression = expression + ' + ' + number_3 + ' x ' + number_4;
                    }
                } else {
                    // if operation_2 is PLUS -> may swap and add it on begin OR on end
                    if (Math.random() >= 0.5) {
                        expression = expression + ' + ' + number_3 + ' x ' + number_4;
                    } else {
                        expression = number_3 + ' x ' + number_4 + ' + ' + expression;
                    }
                    result = result + result34;
                }
            }
        }
    }


    // 2 x 7 + 3 x 8 + 63 = 18 length is good enough
    // 3 x 2 x 7 + 80 = 14 length, which is too short
    // 85 + 4 x 2 x 10 = 15 length, which is too short
    if (expression.length < 16) {
        number = parseInt(get_random_int('30-80'));
        if (Math.random() >= 0.5) {
            expression = expression + ' + ' + number;
        } else {
            expression = number + ' + ' + expression;
        }
        result = result + number;
    }

    var task = {'expr1': expression + ' = ', 'result': result.toString()};
    return task;
}

function generate_3digit_task(operations, range_numbers, factor=1, type='line') {
    var operation_1 = get_random_operation(operations);
    var operation_2 = get_random_operation(operations);

    var number_1 = 0, number_2 = 0, number_3 = 0, result = 0;
    number_1 = parseInt(get_random_int(range_numbers) * factor);
    number_2 = parseInt(get_random_int(range_numbers) * factor);
    if (operation_1 === OPERATION_SUM) {
        result = number_1 + number_2;

    } else if (operation_1 === OPERATION_SUB) {
        if (number_1 < number_2) {
            var tmp = number_1;
            number_2 = number_1;
            number_1 = tmp;
        }
        result = number_1 - number_2;

    } else if (operation_1 === OPERATION_MUL) {
        result = number_1 * number_2;
    }

    number_3 = parseInt(get_random_int(range_numbers) * factor);
    if (operation_2 === OPERATION_SUM) {
        result = result + number_3;

    } else if (operation_2 === OPERATION_SUB) {
        if (result < number_3) {
            number_1 = number_2 + number_3;
            operation_1 = operation_2;
            result = number_1 - number_2 - number_3;
        } else {
            result = result - number_3;
        }

    } else if (operation_2 === OPERATION_MUL) {
        result = result * number_3;
    }

    // replace * to x for better visualization
    if (operation_1 === OPERATION_MUL) {operation_1='x'}
    if (operation_2 === OPERATION_MUL) {operation_2='x'}

    var task = {};
    if (type === 'line') {
        task = {'expr1': number_1.toString() + ' ' + operation_1
                    + ' ' + number_2.toString() + ' ' + operation_2
                    + ' ' + number_3.toString()+ ' = ', 'result': result.toString()};
    } else {
        task = {'num1': number_1.toString(), 'operation1': operation_1,
                'num2': number_2.toString(), 'operation2': operation_2,
                'num3': number_3.toString(), 'result': result.toString()};
    }

    return task;
}

function generate_2digit_task_signed(operations, range_1, range_2, factor_1=1, factor_2=1) {
    var operation = get_random_operation(operations);
    var number_1 = parseInt(get_random_int(range_1) * factor_1);
    var number_2 = parseInt(get_random_int(range_2) * factor_2);

    var result;
    if (operation === OPERATION_SUM) {
        result = number_1 + number_2;

    } else if (operation === OPERATION_SUB) {
        result = number_1 - number_2;

    } else if (operation === OPERATION_MUL) {
        result = number_1 * number_2;
    }

    var number_2_str = number_2.toString();
    if (parseInt(number_2_str) < 0) {
        number_2_str = '(' + number_2_str + ')';
    }

    return {'num1': number_1, 'num2': number_2_str, 'operation': operation, 'result': result};
}

/*
    usage example:
        generate_2digit_task('+', '0,9', '0,9', 1, 1) - sum of one digit numbers
        generate_2digit_task('+-', '0,10', '0,10', 10, 10) - sum/sub of tens
        generate_2digit_task('+-*', '0,10', '0,10') - sum/sub/mul of one digit numbers
*/
function generate_2digit_task(operations, range_1, range_2, factor_1=1, factor_2=1) {
    var operation = get_random_operation(operations);
    var number_1 = 0, number_2 = 0, result = 0;
    switch (operation) {
        case OPERATION_SUM:
            number_1 = parseInt(get_random_int(range_1) * factor_1);
            number_2 = parseInt(get_random_int(range_2) * factor_2);
            result = number_1 + number_2;
        break;

        case OPERATION_SUB:
            number_1 = parseInt(get_random_int(range_1) * factor_1);
            number_2 = parseInt(get_random_int(range_2) * factor_2);
            // swap numbers if first less than second
            if (number_1 < number_2) {
                var tmp = number_1;
                number_1 = number_2;
                number_2 = tmp;
            }
            result = number_1 - number_2;
        break;

        case OPERATION_MUL:
            number_1 = parseInt(get_random_int(range_1) * factor_1);
            number_2 = parseInt(get_random_int(range_2) * factor_2);
            result = number_1 * number_2;
        break;

        case OPERATION_DIV: // /
            result = parseInt(get_random_int(range_1) * factor_1);
            number_2 = parseInt(get_random_int(range_2) * factor_2);
            number_1 = number_2 * result;

        break;

        default:
            alert("RND generator error: Unknown math operation '" + operation + "'");
            number_1 = number_2 = result = operation = 'error';
        break;
    }

    if ((operation === OPERATION_SUM) || (operation === OPERATION_MUL)) {
        // randomNumber is true => swap number_1 & number_2
        var randomNumber = Math.random() >= 0.5;
        if (randomNumber) {
            tmp = number_1; number_1 = number_2; number_2 = tmp;
        }
    }

    return {'num1': number_1, 'num2': number_2, 'operation': operation, 'result': result};
}

function generate_2digit_fractional_task(operations, range_1, range_2, rank_1=1, rank_2=1) {
    var result, operation = get_random_operation(operations);
    var number_1 = parseFloat(get_random_int(range_1, rank_1));
    var number_2 = parseFloat(get_random_int(range_2, rank_2));

    if ((operation !== 'error') && (number_1 !== 'error') && (number_2 !== 'error')) {
        var operation_result = 0;
        switch (operation) {
            case OPERATION_SUM:
                operation_result = number_1 + number_2;
                break;
            case OPERATION_SUB:
                // swap numbers if first less than second
                if (number_1 < number_2) {
                    var tmp = number_1; number_1 = number_2; number_2 = tmp;
                }
                operation_result = number_1 - number_2;
                break;
            case OPERATION_MUL:
                operation_result = number_1 * number_2;
                break;
            default:
                alert('ERROR: generate_2digit_fractional_task ' + operation);
                number_1 = number_2 = result = operation = 'error';
                break;
        }

        if (parseInt(rank_2) > parseInt(rank_1)) {
            result = parseFloat(operation_result).toFixed(rank_2);
        } else {
            result = parseFloat(operation_result).toFixed(rank_1);
        }

        var position = result.toString().indexOf('.');
        var number = result.toString().slice(position, result.length);
        if ((number === '.0') || (number === '.00') || (number === '.000') || (number === '.0000')) {
            result = result.toString().slice(0, position);
        }

        if ((operation === OPERATION_SUM) || (operation === OPERATION_MUL)) {
            // randomNumber is true => swap number_1 & number_2
            if (Math.random() >= 0.5) {
                tmp = number_1; number_1 = number_2; number_2 = tmp;
            }
        }

    } else {
        number_1 = number_2 = result = operation = 'error';    
    }

    return {'num1': number_1, 'num2': number_2, 'operation': operation, 'result': result};
}

/**
 * @range should be specified with dash: 0-10, 0-100 etc.
 * @rank is the rank of fractional number. For example, 0 means Integer, 1 means tenth: x.1, x.3 etc.
 * Returns a random number between min (inclusive) and max (inclusive)
 * from 0-10: [0...10]
 * from 10-99: [10...99]
 * from 100-999: [100...999]
 * from 1-100: [1...100]
 */
function get_random_int(range, rank=0) {
    var range_numbers = [];
    if (range.charAt(0) === '-') {
        range_numbers[0] = range.substr(0, range.lastIndexOf('-'));
        range_numbers[1] = range.substr(range.lastIndexOf('-')+1, range.length);

    } else {
        range_numbers = range.split('-');
    }

    if (range_numbers.length !== 2 ) {
        console.log('get_random_int error: wrong range format \'' + range + '\', range.split returned length ' + range_numbers.length);
        alert('get_random_int error: wrong range format \'' + range + '\', range.split returned length ' + range_numbers.length);
        return 'error';

    } else {
        var minum = parseInt(range_numbers[0]);
        var maxum = parseInt(range_numbers[1]);
        var rnd = (Math.random() * (maxum - minum) + minum);
        var number = parseFloat(rnd).toFixed(rank);
        // console.log('minum ' + minum + ', maxum ' + maxum);
        return number;
    }
}

/**
 * @operations should be specified one by one in string: '+-*' or '<>='
 * Returns random operation from string
 */
function get_random_operation(operations) {
    var operation = '';
    if (operations.length < 1) {
        alert('get_random_operation: wrong operations format ' + operations);
        operation = 'error';
    } else if (operations.length === 1) {
        operation = operations;
    } else {
        var array = operations.split('');
        operation = array[Math.floor(Math.random() * (array.length))];
    }
    return operation;
}
