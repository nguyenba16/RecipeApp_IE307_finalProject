import * as React from "react";
import {StyleSheet, View, Image, Text} from "react-native";

export default function ItemRecipe() {
  	
  	return (
    	<View style={styles.container}>
			<View style={styles.background_info_reci }>
				<Text style={styles.text_name_reci}>Tên món ăn Tên món ăn Tên món ăn</Text>
				<Text style={styles.text_nl}>Nguyên liệu: Rong biển, nấm kim châm, thịt bằm, hành tím, dầu ăn, muối, hạt nêm </Text>
				<View style={styles.info_user}>
					<Image style={styles.ava} resizeMode="cover" source={require('../../assets/bunbo.jpg')}/>
					<Text style={styles.text_name_user}> Cao Quốc Kiệt</Text>
				</View>
			</View>
			
			<Image style={styles.image} resizeMode="cover" source={require('../../assets/bunbo.jpg')}/>
    	</View>);
};

const styles = StyleSheet.create({
	container:{
		margin: 10,
		marginBottom: 5,
		height: 165,
		borderRadius: 20,
		flexDirection: "row",
		backgroundColor: "#FFFFFF",
		shadowColor: "gray",
		shadowOffset: {
		width: 10,
		height: 10
		},
		shadowRadius: 10,
		elevation: 4,
		shadowOpacity: 1,
	},
	background_info_reci: {
		marginStart: 15,
		marginTop: 5,
		flex: 1,
	},
	text_name_reci:{
		flex: 3,
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "left",
		color: "black",
		width: 235,
		justifyContent: "center"
	},
	text_nl:{
		flex: 4,
		justifyContent: "center",
		fontSize: 15,
		width: 235,
		left: 0,
	},
	info_user:{
		flex: 2,
		justifyContent: "flex-start",
		alignContent: "center",
		flexDirection: "row",	
	},
	ava:{
		height: 30,
		width: 30,
		borderRadius: 100,
	},
	text_name_user: {
		fontSize: 15,
		margin: 5,		
	},
	image:{
		position: "absolute",
		right: 0,
		borderTopRightRadius: 20,
		borderBottomRightRadius: 20,
		width: 141,
		height: 165,
	}
  	
});

