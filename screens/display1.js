import { connect } from "react-redux";
import { addUser } from "../screens/signup/actions/index";
import * as React from "react";
import {
  Text,
  View,
  BackHandler,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import styles from "./skillstyle";
import { Picker } from "react-native-picker-dropdown";
import { TextInput } from "react-native-gesture-handler";

var screenWidth = Math.round(Dimensions.get("window").width) / 100;

class Display1 extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  constructor(props) {
    super(props);
    this.state = {
      skill: "",
      specifics: "",
      about: "",
    };
  }
  handleBackButton = () => {
    this.props.navigation.navigate("Signup");
    return true;
  };

  updateSpecifics = (value) => {
    console.log("enters");
    this.setState({ specifics: value });
  };

  updateSkill = (skill) => {
    this.setState({ skill });
    this.setState({ specifics: "" });
    console.log(this.state.skill);
  };
  getCities = () => {
    if (this.state.skill === "Computer Language")
      return [
        "Enter Language",
        "C",
        "C++",
        "Java",
        "JavaScript",
        "Python",
        "Other",
      ].map((specifics) => <Picker.Item label={specifics} value={specifics} />);
    if (this.state.skill === "New Language")
      return [
        "Enter Language",
        "English",
        "Spanish",
        "French",
        "Japanese",
        "Italian",
        "German",
        "Other",
      ].map((specifics) => <Picker.Item label={specifics} value={specifics} />);

    if (this.state.skill === "Musical Instrument")
      return [
        "Enter Instrument",
        "Piano/Keyboard",
        "Drum",
        "FLute",
        "Guitar",
        "Sitar",
        "Other",
      ].map((specifics) => <Picker.Item label={specifics} value={specifics} />);

    if (this.state.skill === "Web Development")
      return [
        "Enter Technology",
        "Djamgo",
        "Flask",
        "Php",
        "Other",
      ].map((specifics) => <Picker.Item label={specifics} value={specifics} />);

    if (this.state.skill === "")
      return [" "].map((specifics) => (
        <Picker.Item label={specifics} value={specifics} />
      ));
  };
  submit = () => {
    if (this.state.skill == "") {
      Alert.alert(
        "Submit Error",
        "Please Fill The Form Correctly",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else if (this.state.about == "") {
      Alert.alert(
        "Submit Error",
        "About Can't Be Empty",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else {
      this.props.addUser({ skill: this.state.skill });
      this.props.addUser({ specifics: this.state.specifics });
      this.props.addUser({ otherSkill: this.state.otherSkill });
      this.props.addUser({ about: this.state.about });

      this.props.navigation.navigate("Form");
    }
  };

  updateAbout = (value) => {
    this.setState({ about: value });
  };

  renderOther = () => {
    if (this.state.skill === "other skill" || this.state.specifics == "Other") {
      if (this.state.specifics == "Other") var value = "specifics";
      else var value = "skill";
      return (
        <View>
          <Text style={styles.skills}>Enter the {value}:</Text>
          <TextInput
            maxLength={20}
            onChangeText={(value) => {
              if (value == "skill") this.setState({ otherSkill: value });
              else this.setState({ specifics: value });
            }}
            style={styles.textInput}
          ></TextInput>
        </View>
      );
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Select The Area Of Your Expertise</Text>
        <Picker
          selectedValue={this.state.skill}
          onValueChange={this.updateSkill}
          textStyle={{ width: screenWidth * 100, color: "white" }}
          mode="dialog"
        >
          <Picker.Item label="Select Skill: " value="" />
          <Picker.Item label="No Skill" value="student" />
          <Picker.Item label="Photography" value="Photography" />
          <Picker.Item label="Videography" value="Videography" />
          <Picker.Item label="Photoshop" value="Photoshop" />
          <Picker.Item label="Animation" value="Animation" />
          <Picker.Item label="Digital Marketing" value="Digital Marketing" />
          <Picker.Item label="Buisness" value="Buisness" />
          <Picker.Item label="Musical Instrument" value="Musical Instrument" />
          <Picker.Item label="Cooking" value="Cooking" />
          <Picker.Item label="Singing" value="Singing" />
          <Picker.Item label="Drawing" value="Drawing" />
          <Picker.Item label="New Language" value="New Language" />
          <Picker.Item label="Computer Language" value="Computer Language" />
          <Picker.Item label="Cyber Security" value="Cyber Security" />
          <Picker.Item
            label="Artificial Intelligence"
            value="Artificial Intelligence"
          />
          <Picker.Item label="Machine Learning" value="Machine Learning" />
          <Picker.Item label="School Subjects" value="School Subjects" />
          <Picker.Item label="Psychology" value="Psychology" />
          <Picker.Item label=" Web Development" value="Web Development" />
          <Picker.Item label="Mobile Development" value="Mobile Development" />
          <Picker.Item label="Game Development" value="Game Development" />
          <Picker.Item label="Graphic Designing " value="Graphic Designing" />
          <Picker.Item label="Interior Designing " value="Interior Designing" />
          <Picker.Item label="Other" value="other skill" />
        </Picker>
        <Picker
          onValueChange={(itemValue) => this.updateSpecifics(itemValue)}
          selectedValue={this.state.specifics}
          textStyle={{ width: screenWidth * 100, color: "white" }}
          mode="dialog"
        >
          {this.getCities()}
        </Picker>
        {this.renderOther()}
        <TextInput
          onChangeText={this.updateAbout}
          placeholder="Enter About Yourself"
          style={styles.about}
          maxLength={20}
        />

        <TouchableOpacity onPress={this.submit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (value) => dispatch(addUser(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Display1);
