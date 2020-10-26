// full screen size resolution
export const FULL_SCREEN = 890;

// red circles on footer during test
export const RED_CIRCLE = 13;

// green circles on footer during test
export const GREEN_CIRCLE = 131313;

export function get_belt_color(belt) {
    if (belt === 'black') {
        return '#404040';
    } else if (belt === 'brown') {
        return '#cc6600';
    } else if (belt === 'navy') {
        return '#99ccff';
    } else if (belt === 'green') {
        return '#8cff66';
    } else if (belt === 'orange') {
        return '#ffb84d';
    }
    // the White one
    return '#e6e6e6';
}

export function get_timeout_per_test(belt) {
    if (belt === 'white') {
        return 1000;
    } else if (belt === 'orange') {
        return 1100;
    } else if (belt === 'green') {
        return 1300;
    } else if (belt === 'navy') {
        return 3000;
    } else if (belt === 'brown') {
        return 5000;
    }
    return 7000;
}

export function get_radius_per_width() {
    var width = window.innerWidth;
    if (width > 1600) {
        return 23;
    } else if (width > 1400) {
        return 21;
    } else if (width > 800) {
        return 19;
    } else if (width > 500) {
        return 15;
    } else if (width > 400) {
       return 13;
    } else if (width > 300) {
       return 11;
    } else {
       return 8;
    }
}
