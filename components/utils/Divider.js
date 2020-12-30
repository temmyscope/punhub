import React from "react";
import { StyleSheet } from "react-native";
import { Block} from "../utils";
import * as theme from "../../theme";

class Divider extends React.Component {
    render() {
      const { color, style, ...props } = this.props;
      const dividerStyles = [styles.divider, style];
  
      return (
        <Block
          color={color || theme.colors.gray2}
          style={dividerStyles}
          {...props}
        />
      );
    }
}

export default Divider;

const styles = StyleSheet.create({
    divider: {
        height: 0,
        margin: theme.sizes.base * 1.5,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth
    }
  });