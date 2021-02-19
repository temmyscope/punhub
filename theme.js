const colors = {
  accent: "#F72B2B",
  primary: "#D61B1F",
  secondary: "#3A3232",
  tertiary: "#ED6004",
  black: "#000000",
  white: "#FFFFFF",
  gray: "#D9D2D2",
  gray2: "#F6F5F5",
};

const sizes = {
  // global sizes
  base: 10,
  font: 12,
  border: 10,
  radius: 10,
  padding: 25,

  // font sizes
  h1: 32,
  h2: 26,
  h3: 18,
  h5: 12.5, 
  h6: 13.5,
  title: 16,
  header: 16,
  body: 12,
  caption: 12,
  small: 8,
};

const fonts = {
  h1: {
    fontFamily: "Montserrat-Bold",
    fontSize: sizes.h1
  },
  h2: {
    fontFamily: "Montserrat-Bold",
    fontSize: sizes.h2
  },
  h3: {
    fontFamily: "Montserrat-Bold",
    fontSize: sizes.h3
  },
  h5: {
    fontFamily: "Montserrat-Bold",
    fontSize: sizes.h5
  },
  h6: {
    fontFamily: "normal",
    fontSize: sizes.h6
  },
  header: {
    fontSize: sizes.header
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: sizes.title
  },
  body: {
    fontSize: sizes.body
  },
  caption: {
    fontSize: sizes.caption
  },
  small: {
    fontSize: sizes.small
  }
};

export { colors, sizes, fonts };