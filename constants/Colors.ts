export enum Colors {
  DarkAlarm = '#B3261E',
  LightAlarm = '#efb8c8',
  TintColorLight = '#e7e0ec',
  TintColorDark = '#000',
}

export default {
  light: {
    text: '#000',
    background: '#fffbfe',
    navBar: '#f3edf7',
    tint: Colors.TintColorLight,
    tabIconDefault: Colors.TintColorDark,
    tabIconSelected: '#e8def8',
  },
  dark: {
    text: '#fff',
    background: '#000',
    navBar: '#2c2c2c',
    tint: Colors.TintColorDark,
    tabIconDefault: Colors.TintColorLight,
    tabIconSelected: Colors.TintColorDark,
  },
}
