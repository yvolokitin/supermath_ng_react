// full screen size resolution
export const FULL_SCREEN = 890;

// red circles on footer during test
export const RED_CIRCLE = 13;

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
    return '#e6e6e6';
}
