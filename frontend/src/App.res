open ReactNative;

let styles = {
    open Style
    StyleSheet.create({
        "container": viewStyle(
            ~flex=1.0,
            ~backgroundColor="#fff",
            ~alignItems=#center,
            ~justifyContent=#center,
            ()
        )
    })
}

@react.component
let app = () => {
    <View style={styles["container"]}>
      <Text>{React.string("Open up App.res to start working on your app!")}</Text>
      <StatusBar barStyle={#default} />
    </View>
}